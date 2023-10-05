import { mjml } from "./mjml";

it("returns a hast", () => {
  expect(
    mjml(
      { type: "mjml", children: [], attributes: {} },
      undefined,
      {},
      {
        mjHead: { type: "mj-head", children: [] },
        mediaQueries: {},
        navbarBaseUrl: undefined,
        mjClassesAttributes: {},
        mjAllAttributes: {},
      }
    )
  ).toMatchInlineSnapshot(`
    [
      {
        "type": "doctype",
      },
      {
        "children": [
          {
            "children": [
              {
                "children": [],
                "properties": {},
                "tagName": "title",
                "type": "element",
              },
              {
                "type": "raw",
                "value": <!--[if !mso]><!-->,
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
                "value": ,
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
                "value": <!--[if mso]>-->,
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
                "value": <![endif]-->,
              },
              {
                "type": "raw",
                "value": <!--[if lte mso 11]>-->,
              },
              {
                "children": [
                  {
                    "type": "text",
                    "value": ".mj-outlook-group-fix{ width:100% !important; }",
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
                "value": <![endif]-->,
              },
            ],
            "properties": {},
            "tagName": "head",
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
      },
    ]
  `);
});
