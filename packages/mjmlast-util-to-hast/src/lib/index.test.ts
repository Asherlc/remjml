import { toHtml } from "hast-util-to-html";
import { MjmlRoot, MjSection } from "mjmlast";
import { toHast } from ".";

const mjmlAst: MjmlRoot = {
  children: [
    {
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

it("returns a hast that can `hast-util-from-html` can stringify", () => {
  const hast = toHast(mjmlAst);

  expect(toHtml(hast as any, { allowDangerousHtml: true }))
    .toMatchInlineSnapshot(`
    "<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if mso]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">#outlook a { padding:0; }
    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
    p { display:block;margin:13px 0; }</style><!--[if mso]><noscript><xml><o:officedocumentsettings><o:allowpng></o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml></noscript><![endif]--><!--[if lte mso 11]><style type="text/css">.mj-outlook-group-fix { width:100% !important; }</style><![endif]--></head><body style="word-spacing:normal"><div style=""><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly"><div style="margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td style="font-size:0px;word-break:break-word"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width:100%;max-width:100%;border-collapse:collapse;border-spacing:0px"><tbody><tr><td><image height="auto" src="/assets/img/logo-small.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="100"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>"
  `);
});

fit("transforms a mjmlast section to hast", () => {
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

  expect(toHast(section)).toMatchInlineSnapshot(`
    {
      "0": {
        "type": "raw",
        "value": "<!--[if mso | IE]>",
      },
      "1": {
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
                      "style": "margin:0px auto",
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
          "style": "",
        },
        "tagName": "table",
        "type": "element",
      },
      "2": {
        "type": "raw",
        "value": "<![endif]-->",
      },
      "position": {
        "end": {
          "column": 26,
          "line": 1,
          "offset": 25,
        },
        "start": {
          "column": 1,
          "line": 1,
          "offset": 0,
        },
      },
    }
  `);
});
