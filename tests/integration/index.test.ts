import "expect-puppeteer";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import originalMjml from "mjml";

expect.extend({ toMatchImageSnapshot });

fit("renders the same visual html as original mjml library", async () => {
  const mjml = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const ourHtml = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype as any)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value;

  const theirHtml = originalMjml(mjml).html;

  await page.goto(`data:text/html,${ourHtml}`, { waitUntil: "networkidle0" });
  const ourImageData = await page.screenshot();
  await page.goto(`data:text/html,${theirHtml}`, { waitUntil: "networkidle0" });
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
  const mjml = `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const ourHtml = (
    await unified()
      .use(remjmlParse)
      .use(remjmlRehype as any)
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      })
      .process(mjml)
  ).value;

  await page.goto(`data:text/html,${ourHtml}`, { waitUntil: "networkidle0" });
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});
