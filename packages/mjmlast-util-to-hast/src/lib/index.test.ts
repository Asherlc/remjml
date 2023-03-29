import { toHtml } from "hast-util-to-html";
import { MjmlRoot, MjSection } from "mjmlast";
import { toHast } from ".";

const mjmlAst: MjmlRoot = {
  attributes: {},
  children: [
    {
      attributes: {},
      children: [
        {
          attributes: {},
          children: [
            {
              attributes: {},
              children: [
                {
                  attributes: {
                    src: "/assets/img/logo-small.png",
                    width: "100px",
                  },
                  type: "mj-image",
                },
                {
                  attributes: {
                    "border-color": "#F46E43",
                  },
                  type: "mj-divider",
                },
                {
                  attributes: {
                    color: "#F45E43",
                    "font-family": "Helvetica",
                    "font-size": "20px",
                  },
                  content: "Hello World",
                  type: "mj-text",
                },
              ],
              type: "mj-column",
            },
          ],
          type: "mj-section",
        },
      ],
      type: "mj-body",
    },
  ],
  type: "mjml",
};

it("converts to mjmlast to hast", () => {
  const hast = toHast(mjmlAst);

  expect(hast).toMatchInlineSnapshot(`
    {
      "children": [
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
                  "value": ,
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
                  "value": <![endif]-->,
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
                  "value": ,
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
                  "value": ,
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
                  "value": <![endif]-->,
                },
                {
                  "children": [
                    {
                      "type": "text",
                      "value": "
                noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
                @media only screen and (max-width:479px) {
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
                }",
                    },
                  ],
                  "properties": {
                    "type": "text/css",
                  },
                  "tagName": "style",
                  "type": "element",
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
                                                                                "width": "100%",
                                                                              },
                                                                              "tagName": "image",
                                                                              "type": "element",
                                                                            },
                                                                          ],
                                                                          "properties": {
                                                                            "style": "width:[object Object]px",
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
                                                                "style": "border-collapse:collapse;border-spacing:0px",
                                                              },
                                                              "tagName": "table",
                                                              "type": "element",
                                                            },
                                                          ],
                                                          "properties": {
                                                            "align": "center",
                                                            "style": "font-size:0px;padding:10px 25px;word-break:break-word",
                                                          },
                                                          "tagName": "td",
                                                          "type": "element",
                                                        },
                                                      ],
                                                      "properties": {},
                                                      "tagName": "tr",
                                                      "type": "element",
                                                    },
                                                    {
                                                      "children": [
                                                        {
                                                          "children": [
                                                            {
                                                              "children": [],
                                                              "properties": {
                                                                "style": "border-top:solid 4px #F46E43;font-size:1px;margin:0px auto;width:100%",
                                                              },
                                                              "tagName": "p",
                                                              "type": "element",
                                                            },
                                                            {
                                                              "type": "raw",
                                                              "value": ,
                                                            },
                                                            {
                                                              "children": [
                                                                {
                                                                  "children": [
                                                                    {
                                                                      "children": [
                                                                        {
                                                                          "type": "text",
                                                                          "value": "&nbsp;",
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
                                                              "properties": {
                                                                "align": "center",
                                                                "border": 0,
                                                                "cellPadding": "0",
                                                                "cellSpacing": "0",
                                                                "role": "presentation",
                                                                "style": "border-top:solid 4px #F46E43;font-size:1px;margin:0px auto;width:0px",
                                                                "width": "0px",
                                                              },
                                                              "tagName": "table",
                                                              "type": "element",
                                                            },
                                                            {
                                                              "type": "raw",
                                                              "value": <![endif]-->,
                                                            },
                                                          ],
                                                          "properties": {
                                                            "align": "center",
                                                            "style": "font-size:0px;padding:10px 25px;word-break:break-word",
                                                          },
                                                          "tagName": "td",
                                                          "type": "element",
                                                        },
                                                      ],
                                                      "properties": {},
                                                      "tagName": "tr",
                                                      "type": "element",
                                                    },
                                                    {
                                                      "children": [
                                                        {
                                                          "children": [
                                                            {
                                                              "children": [],
                                                              "properties": {
                                                                "style": "font-family:Helvetica;font-size:20px;letter-spacing:none;line-height:1;text-align:left;color:#F45E43",
                                                              },
                                                              "tagName": "div",
                                                              "type": "element",
                                                            },
                                                          ],
                                                          "properties": {
                                                            "align": "left",
                                                            "style": "font-size:0px;padding:10px 25px;word-break:break-word",
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
        },
      ],
      "type": "root",
    }
  `);
});

it("returns a hast that can `hast-util-from-html` can stringify", () => {
  const hast = toHast(mjmlAst);

  expect(toHtml(hast as any, { allowDangerousHtml: true }))
    .toMatchInlineSnapshot(`
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <title>
        </title>
        <meta http-equiv="Content-Type"
              content="text/html; charset=UTF-8"
        >
        <meta name="viewport"
              content="width=device-width, initial-scale=1"
        >
        <style type="text/css">
          #outlook a { padding:0; }
    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
    p { display:block;margin:13px 0; }
        </style>
        <style type="text/css">
          noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
                @media only screen and (max-width:479px) {
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
                  .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
                  .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
                }
        </style>
      </head>
      <body style="word-spacing:normal">
        <div style>
          <div style="margin:0px auto;max-width:600px">
            <table align="center"
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   style="width:100%"
            >
              <tbody>
                <tr>
                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                    <div class="mj-column-per-100 mj-outlook-group-fix"
                         style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"
                    >
                      <table border="0"
                             cellpadding="0"
                             cellspacing="0"
                             role="presentation"
                             style="vertical-align:top"
                             width="100%"
                      >
                        <tbody>
                          <tr>
                            <td align="center"
                                style="font-size:0px;padding:10px 25px;word-break:break-word"
                            >
                              <table border="0"
                                     cellpadding="0"
                                     cellspacing="0"
                                     role="presentation"
                                     style="border-collapse:collapse;border-spacing:0px"
                              >
                                <tbody>
                                  <tr>
                                    <td style="width:[object Object]px">
                                      <image height="auto"
                                             src="/assets/img/logo-small.png"
                                             style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px"
                                             width="100%"
                                      >
                                      </image>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center"
                                style="font-size:0px;padding:10px 25px;word-break:break-word"
                            >
                              <p style="border-top:solid 4px #F46E43;font-size:1px;margin:0px auto;width:100%">
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td align="left"
                                style="font-size:0px;padding:10px 25px;word-break:break-word"
                            >
                              <div style="font-family:Helvetica;font-size:20px;letter-spacing:none;line-height:1;text-align:left;color:#F45E43">
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  `);
});

it("transforms a mjmlast section to hast", () => {
  const section: MjSection = {
    attributes: {},
    children: [],
    position: {
      end: {
        column: 26,
        line: 1,
        offset: 25,
      },
      start: {
        column: 1,
        line: 1,
        offset: 0,
      },
    },
    type: "mj-section",
  };

  const hast = toHast(section);

  expect(hast).toMatchInlineSnapshot();
});
