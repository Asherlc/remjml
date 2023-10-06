import "jest-puppeteer";
import "expect-puppeteer";
import { resolve, dirname, format } from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { toMatchImageSnapshot } from "jest-image-snapshot";
import originalMjml from "mjml";
import { remjml } from "remjml";
import "jest-match-performance";
import "jest-match-html";

expect.extend({ toMatchImageSnapshot });

const emailFixtureNames = [
  "arturia",
  "black-friday",
  "happy-new-year",
  "hello-world",
  "proof",
  "welcome-email",
  "worldly",
];

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const emailFixtureDirectoryPath: string = resolve(
  __dirname,
  "../fixtures/mjml-emails/"
);

const emailFixtureDirectoryExists = (
  await stat(emailFixtureDirectoryPath)
).isDirectory();

if (!emailFixtureDirectoryExists) {
  throw new Error(`${emailFixtureDirectoryPath} is not a directory`);
}

describe.each(emailFixtureNames)("%s email fixture", (emailFixtureName) => {
  let mjml: string;

  beforeAll(async () => {
    const mjmlBuffer = await readFile(
      format({
        dir: emailFixtureDirectoryPath,
        name: emailFixtureName,
        ext: ".mjml",
      })
    );

    mjml = mjmlBuffer.toString();
  });

  describe.each([
    // small
    [320, 569],
    [360, 640],
    [460, 854],
    // tablet
    [960, 540],
    // desktop
    [1024, 640],
    [1366, 768],
    [1920, 1080],
  ])("rendered in a %sx%s viewport", (width: number, height: number) => {
    beforeEach(async () => {
      page.setViewport({ width, height });
    });

    it(
      "renders the same visual as original mjml library",
      async () => {
        const theirHtml: string = originalMjml(mjml).html;
        const html: string = (await remjml().process(mjml)).toString();
        const ourBuffer: Buffer = Buffer.from(html);
        const theirBuffer: Buffer = Buffer.from(theirHtml);

        await page.goto(
          `data:text/html;base64,${ourBuffer.toString("base64")}`,
          {
            waitUntil: "networkidle0",
          }
        );
        const ourImageData: Buffer = await page.screenshot({ fullPage: true });
        await page.goto(
          `data:text/html;base64,${theirBuffer.toString("base64")}`,
          {
            waitUntil: "networkidle0",
          }
        );
        const theirImageData: Buffer = await page.screenshot({
          fullPage: true,
        });

        await expect(ourImageData).toMatchImage(theirImageData);
      },
      1000 * 20
    );

    it("renders the same as before", async () => {
      const html: string = (await remjml().process(mjml)).toString();
      const buffer: Buffer = Buffer.from(html);
      await page.goto(`data:text/html;base64,${buffer.toString("base64")}`, {
        waitUntil: ["load", "networkidle0"],
      });
      const image: Buffer = await page.screenshot({ fullPage: true });
      expect(image).toMatchImageSnapshot();
    });
  });

  it("renders the same html as before`", async () => {
    const html: string = (await remjml().process(mjml)).toString();

    expect(html).toMatchSnapshot();
  });

  fit("renders faster than the original mjml library", async () => {
    await expect(async () => await remjml().process(mjml)).toBeFasterThan(() =>
      originalMjml(mjml)
    );
  });
});
