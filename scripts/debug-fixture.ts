#!/usr/bin/env node --loader ts-node/esm
import { program, Option } from "commander";
import path from "path";
import fsPromise from "fs/promises";

import puppeteer from "puppeteer";

import { unified } from "unified";
import remjmlParse from "remjml-parse";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";

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

const fixtureNameOption = new Option("--fixture-name <fixture-name>")
  .choices(emailFixtureNames)
  .makeOptionMandatory();

program.addOption(fixtureNameOption);

program.parse();

const emailFixtureDirectoryPath = path.resolve("./tests/fixtures/mjml-emails/");

const emailFixtureName = program.opts<Options>().fixtureName;

const mjmlBuffer = await fsPromise.readFile(
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

const base64Url: string = `data:text/html;base64,${buffer.toString("base64")}`;

const browser = await puppeteer.launch({
  headless: false,
  args: ["--disable-notifications"],
});
const page = await browser.newPage();
page.goto(base64Url);
