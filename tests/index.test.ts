import mjmlJsonToRemjml, { MJMLJsonObject } from "mjml-json-to-remjml/src";
import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";

const mjmlJson: MJMLJsonObject = {
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
  expect(mjmlAst).toMatchInlineSnapshot(`
    {
      "attributes": {},
      "children": [
        {
          "attributes": {},
          "children": [
            {
              "attributes": {},
              "children": [
                {
                  "attributes": {},
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
                  "content": undefined,
                  "type": "mj-column",
                },
              ],
              "content": undefined,
              "type": "mj-section",
            },
          ],
          "content": undefined,
          "type": "mj-body",
        },
      ],
      "content": undefined,
      "type": "mjml",
    }
  `);

  const html = await unified()
    .use(remjmlRehype as any)
    .use(rehypeStringify)
    .run(mjmlAst);

  expect(html).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "type": "raw",
              "value": "<!--[if mso]>",
            },
            {
              "children": [],
              "properties": {
                "content": "IE=edge",
                "httpEquiv": [
                  "X-UA-Compatible",
                ],
              },
              "tagName": "meta",
              "type": "element",
            },
            {
              "type": "raw",
              "value": "<![endif]-->",
            },
            {
              "children": [],
              "properties": {
                "content": "text/html; charset=UTF-8",
                "httpEquiv": [
                  "Content-Type",
                ],
              },
              "tagName": "meta",
              "type": "element",
            },
            {
              "children": [],
              "properties": {
                "content": "width=device-width, initial-scale=1",
                "name": "viewport",
              },
              "tagName": "meta",
              "type": "element",
            },
            {
              "children": [
                {
                  "type": "text",
                  "value": "#outlook a { padding:0; }
    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
    p { display:block;margin:13px 0; }",
                },
              ],
              "properties": {
                "type": "text/css",
              },
              "tagName": "style",
              "type": "element",
            },
            {
              "type": "raw",
              "value": "<!--[if mso]>",
            },
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [
                        {
                          "children": [],
                          "properties": {},
                          "tagName": "o:allowpng",
                          "type": "element",
                        },
                        {
                          "children": [
                            {
                              "type": "text",
                              "value": "96",
                            },
                          ],
                          "properties": {},
                          "tagName": "o:pixelsperinch",
                          "type": "element",
                        },
                      ],
                      "properties": {},
                      "tagName": "o:officedocumentsettings",
                      "type": "element",
                    },
                  ],
                  "properties": {},
                  "tagName": "xml",
                  "type": "element",
                },
              ],
              "properties": {},
              "tagName": "noscript",
              "type": "element",
            },
            {
              "type": "raw",
              "value": "<![endif]-->",
            },
            {
              "type": "raw",
              "value": "<!--[if lte mso 11]>",
            },
            {
              "children": [
                {
                  "type": "text",
                  "value": ".mj-outlook-group-fix { width:100% !important; }",
                },
              ],
              "properties": {
                "type": "text/css",
              },
              "tagName": "style",
              "type": "element",
            },
            {
              "type": "raw",
              "value": "<![endif]-->",
            },
          ],
          "properties": {},
          "tagName": "head",
          "type": "element",
        },
        {
          "children": [
            {
              "children": [
                {
                  "type": "raw",
                  "value": "<!--[if mso | IE]>",
                },
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
                                                  "type": "raw",
                                                  "value": "<!--[if mso | IE]>",
                                                },
                                                {
                                                  "children": [
                                                    {
                                                      "type": "raw",
                                                      "value": "<![endif]-->",
                                                    },
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
                                                                                      "children": [
                                                                                        {
                                                                                          "children": [],
                                                                                          "properties": {
                                                                                            "height": "auto",
                                                                                            "src": "/assets/img/logo-small.png",
                                                                                            "style": "border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px",
                                                                                            "width": 100,
                                                                                          },
                                                                                          "tagName": "image",
                                                                                          "type": "element",
                                                                                        },
                                                                                      ],
                                                                                      "properties": {},
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
                                                                            "style": "min-width:100%;max-width:100%;border-collapse:collapse;border-spacing:0px",
                                                                          },
                                                                          "tagName": "table",
                                                                          "type": "element",
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
                                                            "style": "vertical-align:top",
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
                                                    {
                                                      "type": "raw",
                                                      "value": "<!--[if mso | IE]>",
                                                    },
                                                  ],
                                                  "properties": {
                                                    "border": 0,
                                                    "cellPadding": 0,
                                                    "cellSpacing": 0,
                                                    "role": "presentation",
                                                  },
                                                  "tagName": "table",
                                                  "type": "element",
                                                },
                                              ],
                                              "properties": {
                                                "style": "direction:ltr;font-size:0px;padding:20px 0;text-align:center",
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
                                    "align": "center",
                                    "border": 0,
                                    "cellPadding": "0",
                                    "cellSpacing": "0",
                                    "role": "presentation",
                                    "style": "width:100%",
                                  },
                                  "tagName": "table",
                                  "type": "element",
                                },
                              ],
                              "properties": {
                                "style": "margin:0px auto;max-width:600px",
                              },
                              "tagName": "div",
                              "type": "element",
                            },
                            {
                              "type": "raw",
                              "value": "<!--[if mso | IE]>",
                            },
                          ],
                          "properties": {
                            "style": "line-height:0px;font-size:0px;mso-line-height-rule:exactly",
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
                  "properties": {
                    "align": "center",
                    "border": 0,
                    "cellPadding": "0",
                    "cellSpacing": "0",
                    "role": "presentation",
                    "style": "width:600px",
                    "width": 600,
                  },
                  "tagName": "table",
                  "type": "element",
                },
                {
                  "type": "raw",
                  "value": "<![endif]-->",
                },
              ],
              "properties": {
                "style": "",
              },
              "tagName": "div",
              "type": "element",
            },
          ],
          "properties": {
            "style": "word-spacing:normal",
          },
          "tagName": "body",
          "type": "element",
        },
      ],
      "properties": {
        "xmlns": "http://www.w3.org/1999/xhtml",
        "xmlns:o": "urn:schemas-microsoft-com:office:office",
        "xmlns:v": "urn:schemas-microsoft-com:vml",
      },
      "tagName": "html",
      "type": "element",
    }
  `);
});
