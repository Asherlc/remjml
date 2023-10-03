import { program, Option } from "commander";
import path from "node:path";
import { readFile, watch } from "node:fs/promises";

import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

import { unified } from "unified";
import remjmlParse from "remjml-parse";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";

async function mjmlToBase64UrlForFixtureName(emailFixtureName) {
  const emailFixtureDirectoryPath: string = path.resolve(
    "./tests/fixtures/mjml-emails/"
  );
  const mjmlBuffer = await readFile(
    path.format({
      dir: emailFixtureDirectoryPath,
      name: emailFixtureName,
      ext: ".mjml",
    })
  );

  const mjml: string = mjmlBuffer.toString();

  const html: string = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value.toString();

  const buffer: Buffer = Buffer.from(html);

  const base64Url: string = `data:text/html;base64,${buffer.toString(
    "base64"
  )}`;
  return base64Url;
}

interface Options {
  fixtureName: string;
}

const emailFixtureNames = [
  "arturia",
  "black-friday",
  "happy-new-year",
  "hello-world",
  "proof",
  "welcome-email",
  "worldly",
];

const fixtureNameOption: Option = new Option("--fixture-name <fixture-name>")
  .choices(emailFixtureNames)
  .makeOptionMandatory();

program.addOption(fixtureNameOption).option("port", "server port", "9734");

program.parse();

const emailFixtureName: string = program.opts<Options>().fixtureName;

const base64Url: string = await mjmlToBase64UrlForFixtureName(emailFixtureName);

const browser: Browser = await puppeteer.launch({
  headless: false,
  args: ["--disable-notifications"],
});
const page: Page = await browser.newPage();
page.goto(base64Url);

const watcher = watch(".", { recursive: true });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
for await (const event of watcher) {
  page.goto(await mjmlToBase64UrlForFixtureName(emailFixtureName));
}
