import { program, Argument } from "commander";
import path from "node:path";
import { readFile } from "node:fs/promises";

import type { Browser, Page, Viewport } from "puppeteer";
import puppeteer from "puppeteer";

import { unified } from "unified";
import remjmlParse from "remjml-parse";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";

async function mjmlToBase64UrlForFixtureName(emailFixtureName: string) {
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

async function launch(emailFixtureName: string, viewport: Viewport) {
  const base64Url: string =
    await mjmlToBase64UrlForFixtureName(emailFixtureName);

  const browser: Browser = await puppeteer.launch({
    defaultViewport: viewport,
    headless: false,
    args: [
      "--disable-notifications",
      // Disable all chrome extensions
      "--disable-extensions",
      // Disable some extensions that aren't affected by --disable-extensions
      "--disable-component-extensions-with-background-pages",
      // Disable various background network services, including extension updating,
      //   safe browsing service, upgrade detector, translate, UMA
      "--disable-background-networking",
      // Don't update the browser 'components' listed at chrome://components/
      "--disable-component-update",
      // Disables client-side phishing detection.
      "--disable-client-side-phishing-detection",
      // Disable syncing to a Google account
      "--disable-sync",
      // Disable reporting to UMA, but allows for collection
      "--metrics-recording-only",
      // Disable installation of default apps on first run
      "--disable-default-apps",
      // Mute any audio
      "--mute-audio",
      // Disable the default browser check, do not prompt to set it as such
      "--no-default-browser-check",
      // Skip first run wizards
      "--no-first-run",
      // Disable backgrounding renders for occluded windows
      "--disable-backgrounding-occluded-windows",
      // Disable renderer process backgrounding
      "--disable-renderer-backgrounding",
      // Disable task throttling of timer tasks from background pages.
      "--disable-background-timer-throttling",
      // Disable the default throttling of IPC between renderer & browser processes.
      "--disable-ipc-flooding-protection",
      // Avoid potential instability of using Gnome Keyring or KDE wallet. crbug.com/571003 crbug.com/991424
      "--password-store=basic",
      // Use mock keychain on Mac to prevent blocking permissions dialogs
      "--use-mock-keychain",
      // Disable background tracing (aka slow reports & deep reports) to avoid 'Tracing already started'
      "--force-fieldtrials=*BackgroundTracing/default/",

      // Suppresses hang monitor dialogs in renderer processes. This flag may allow slow unload handlers on a page to prevent the tab from closing.
      "--disable-hang-monitor",
      // Reloading a page that came from a POST normally prompts the user.
      "--disable-prompt-on-repost",
      // Disables Domain Reliability Monitoring, which tracks whether the browser has difficulty contacting Google-owned sites and uploads reports to Google.
      "--disable-domain-reliability",
    ],
  });
  const page: Page = await browser.newPage();
  await page.goto(base64Url);
}

interface Options {
  viewport: string;
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

const fixtureNameArgument: Argument = new Argument("<fixture-name>").choices(
  emailFixtureNames
);

program
  .addArgument(fixtureNameArgument)
  .option("--viewport <viewport>", "viewport", "1080x1024")
  .action(async (emailFixtureName: string, { viewport }: Options) => {
    const [width, height] = viewport.split("x");

    if (!width || !height) {
      throw new Error(`No width or height given`);
    }

    await launch(emailFixtureName, {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  });

program.parse();
