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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerPlugin = (...args: any[]) => {
  return (tree, file) => {
    console.log(...args, JSON.stringify(tree), file);
  };
};

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
          .use(remjmlRehype as any)
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

  it("renders the same visual as original mjml library", async () => {
    const theirHtml = originalMjml(mjml).html;
    const ourBuffer = Buffer.from(html);
    const theirBuffer = Buffer.from(theirHtml);

    await page.goto(`data:text/html;base64,${ourBuffer.toString("base64")}`, {
      waitUntil: "networkidle0",
    });
    const ourImageData = await page.screenshot();
    await page.goto(`data:text/html;base64,${theirBuffer.toString("base64")}`, {
      waitUntil: "networkidle0",
    });
    const theirImageData = await page.screenshot();

    const ourPng = PNG.sync.read(ourImageData);
    const theirPng = PNG.sync.read(theirImageData);

    const diff = pixelmatch(
      theirPng.data,
      ourPng.data,
      null,
      ourPng.width,
      ourPng.height
    );

    expect(diff).toBe(0);
  });

  it("renders the same as before", async () => {
    const buffer = Buffer.from(html);
    await page.goto(`data:text/html;base64,${buffer.toString("base64")}`, {
      waitUntil: ["load", "networkidle0"],
    });
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });

  it("renders the same html as before`", async () => {
    expect(html).toMatchSnapshot();
  });
});
