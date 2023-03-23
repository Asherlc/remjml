import "expect-puppeteer";
import path from "path";
import fs from "fs";
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

const emailFixtureDirectoryPath = path.resolve("./tests/fixtures/mjml-emails");

const emailFixtureFileNames = fs.readdirSync(emailFixtureDirectoryPath);

describe.each(emailFixtureFileNames)(
  "%s email fixture",
  (emailFixtureFilename) => {
    let mjml: string;
    let html: string;

    beforeAll(async () => {
      const mjmlBuffer = await fsPromise.readFile(
        path.join(emailFixtureDirectoryPath, emailFixtureFilename)
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
      await page.goto(
        `data:text/html;base64,${theirBuffer.toString("base64")}`,
        {
          waitUntil: "networkidle0",
        }
      );
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
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });

    it("renders the same html as before`", async () => {
      expect(html).toMatchSnapshot();
    });
  }
);
