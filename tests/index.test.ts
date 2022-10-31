import mjmlJsonToRemjml from "mjml-json-to-remjml/src";
import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";

const mjmlJson = {
  tagName: "mjml",
  attributes: {},
  children: [
    {
      tagName: "mj-body",
      attributes: {},
      children: [
        {
          tagName: "mj-section",
          attributes: {},
          children: [
            {
              tagName: "mj-column",
              attributes: {},
              children: [
                {
                  tagName: "mj-image",
                  attributes: {
                    width: "100px",
                    src: "/assets/img/logo-small.png",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

it("transforms mjml json to html", async () => {
  const mjmlAst = mjmlJsonToRemjml(mjmlJson);
  const html = await unified()
    .use(remjmlRehype as any)
    .use(rehypeStringify as any)
    .run(mjmlAst);

  expect(html).toMatchInlineSnapshot();
});
