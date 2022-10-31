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
  console.log(mjmlAst);

  const html = await unified()
    .use(remjmlRehype as any)
    .use(rehypeStringify as any)
    .run(mjmlAst);

  expect(html).toMatchInlineSnapshot(`
{
  "children": [
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [
                            {
                              "children": [
                                {
                                  "attributes": {
                                    "src": "/assets/img/logo-small.png",
                                    "width": "100px",
                                  },
                                  "children": [],
                                  "content": undefined,
                                  "type": "mj-image",
                                },
                              ],
                              "properties": {
                                "style": "font-size:0px;word-break:break-word",
                              },
                              "tagName": "td",
                              "type": "element",
                            },
                          ],
                          "properties": {},
                          "tagName": "tr",
                          "type": "element",
                        },
                      ],
                      "properties": {},
                      "tagName": "tbody",
                      "type": "element",
                    },
                  ],
                  "properties": {
                    "border": 0,
                    "cellPadding": "0",
                    "cellSpacing": "0",
                    "role": "presentation",
                    "style": "table",
                    "width": "100%",
                  },
                  "tagName": "table",
                  "type": "element",
                },
              ],
              "properties": {
                "className": [
                  "mj-column-per-100",
                  "mj-outlook-group-fix",
                ],
                "style": "font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%",
              },
              "tagName": "div",
              "type": "element",
            },
          ],
          "properties": {
            "style": "background-color: undefined",
          },
          "tagName": "div",
          "type": "element",
        },
      ],
      "properties": {
        "style": "background-color: undefined",
      },
      "tagName": "div",
      "type": "element",
    },
  ],
  "properties": {},
  "tagName": "div",
  "type": "element",
}
`);
});
