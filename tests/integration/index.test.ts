import { kebabCase } from "lodash-es";
import "jest-puppeteer";
import sharp from "sharp";
import "expect-puppeteer";
import path from "path";
import fsPromise from "fs/promises";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import originalMjml from "mjml";

expect.extend({ toMatchImageSnapshot });

async function toMatchImage(
  this: jest.MatcherContext,
  receivedImage: Buffer | Uint8Array | Uint8ClampedArray,
  expectedImage: Buffer | Uint8Array | Uint8ClampedArray,
  limit = 0
) {
  const receivedSharp = sharp(receivedImage);
  const expectedSharp = sharp(expectedImage);
  const receivedMetada = await receivedSharp.metadata();
  const expectedMetadata = await expectedSharp.metadata();
  const maximumWidth = Math.max(
    receivedMetada.width || 0,
    expectedMetadata.width || 0
  );
  const maximumHeight = Math.max(
    receivedMetada.height || 0,
    expectedMetadata.height || 0
  );

  // derive a new version "boxedBuffer1" of "img1.png", conceptually placing "img1.png" in the upper-left corner of a bounding box canvas
  const receivedBoxedBuffer = await receivedSharp
    .resize({
      width: maximumWidth,
      height: maximumHeight,
      fit: "contain", // instead of cropping or stretching, use "(letter/pillar/window)-boxing" (black space) to fill any excess space
      position: "left top", // arrange the original image in the upper-left corner
    })
    .raw()
    .toBuffer();

  const expectedBoxedBuffer = await expectedSharp
    .resize({
      width: maximumWidth,
      height: maximumHeight,
      fit: "contain",
      position: "left top",
    })
    .raw()
    .toBuffer();

  const diff = new PNG({
    width: maximumWidth,
    height: maximumHeight,
  });

  const numDiffPixels = pixelmatch(
    receivedBoxedBuffer,
    expectedBoxedBuffer,
    diff.data,
    maximumWidth,
    maximumHeight
  );

  const fileName = `${kebabCase(expect.getState().currentTestName)}.png`;
  const filePath = `./tmp/${fileName}`;
  await fsPromise.writeFile(filePath, PNG.sync.write(diff));

  const pass = numDiffPixels <= limit;

  const messageBuilder = () =>
    `expected ${this.utils.printReceived(
      numDiffPixels
    )} to be less than ${this.utils.printExpected(
      limit
    )}, diff saved at "${filePath}"`;

  if (pass) {
    return {
      message: messageBuilder,
      pass: true,
    };
  } else {
    return {
      message: messageBuilder,
      pass: false,
    };
  }
}

expect.extend({ toMatchImage });

const emailFixtureNames = [
  "arturia",
  "black-friday",
  "happy-new-year",
  "hello-world",
  "proof",
  "welcome-email",
  "worldly",
];

const emailFixtureDirectoryPath = path.resolve("./tests/fixtures/mjml-emails/");

describe.each(emailFixtureNames)("%s email fixture", (emailFixtureName) => {
  let mjml: string;
  let html: string;

  beforeAll(async () => {
    const mjmlBuffer = await fsPromise.readFile(
      path.format({
        dir: emailFixtureDirectoryPath,
        name: emailFixtureName,
        ext: ".mjml",
      })
    );

    mjml = mjmlBuffer.toString();

    try {
      html = (
        await unified()
          .use(remjmlParse)
          .use(remjmlRehype as any)
          .use(rehypeStringify, {
            allowDangerousHtml: true,
          })
          .process(mjml)
      ).value.toString();
    } catch (error) {
      console.error(error);
      throw new Error(`test Error rendering mjml: ${error}`);
    }

    try {
      html = (
        await unified()
          .use(remjmlParse)
          .use(remjmlRehype)
          .use(rehypeStringify, {
            allowDangerousHtml: true,
          })
          .process(mjml)
      ).value.toString();
    } catch (error) {
      console.error(error);
      throw new Error(`Error rendering mjml: ${error}`);
    }
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
        const theirHtml = originalMjml(mjml).html;
        const ourBuffer = Buffer.from(html);
        const theirBuffer = Buffer.from(theirHtml);

        await page.goto(
          `data:text/html;base64,${ourBuffer.toString("base64")}`,
          {
            waitUntil: "networkidle0",
          }
        );
        const ourImageData = await page.screenshot({ fullPage: true });
        await page.goto(
          `data:text/html;base64,${theirBuffer.toString("base64")}`,
          {
            waitUntil: "networkidle0",
          }
        );
        const theirImageData = await page.screenshot({ fullPage: true });

        await expect(ourImageData).toMatchImage(theirImageData);
      },
      1000 * 20
    );

    it("renders the same as before", async () => {
      const buffer = Buffer.from(html);
      await page.goto(`data:text/html;base64,${buffer.toString("base64")}`, {
        waitUntil: ["load", "networkidle0"],
      });
      const image = await page.screenshot({ fullPage: true });
      expect(image).toMatchImageSnapshot();
    });
  });

  it("renders the same html as before`", async () => {
    expect(html).toMatchSnapshot();
  });
});
