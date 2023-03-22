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

      html = (
        await unified()
          .use(remjmlParse)
          .use(remjmlRehype as any)
          .use(rehypeStringify, {
            allowDangerousHtml: true,
          })
          .process(mjml)
      ).value.toString();
    });

    it("renders the same visual as original mjml library for %s", async (emailFixtureFileName) => {
      const theirHtml = originalMjml(mjml).html;

      await page.goto(`data:text/html,${html}`, {
        waitUntil: "networkidle0",
      });
      const ourImageData = await page.screenshot();
      await page.goto(`data:text/html,${theirHtml}`, {
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

    it("renders the same visual html as before`", async () => {
      await page.goto(`data:text/html,${html}`, {
        waitUntil: "networkidle0",
      });
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });

    it("renders the same html as before`", async () => {
      expect(html).toMatchSnapshot();
    });
  }
);
