import "expect-puppeteer";
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
  const image = await page.screenshot();
});
