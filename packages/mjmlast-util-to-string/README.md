# mjmlast-util-to-hast

Convert mjmlast to hast

## Example

mjmlast:

```javascript
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
}
```

converts to hast:

```javascript
{
    type: "root",
    children: [
      { type: "doctype" },
      {
        type: "element",
        tagName: "html",
        properties: {
          xmlns: "http://www.w3.org/1999/xhtml",
          "xmlns:v": "urn:schemas-microsoft-com:vml",
          "xmlns:o": "urn:schemas-microsoft-com:office:office",
        },
        children: [
          {
            type: "element",
            tagName: "head",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "title",
                properties: {},
                children: [],
              },
              { type: "raw", value: "<!--if mso]>" },
              {
                type: "element",
                tagName: "meta",
                properties: {
                  httpEquiv: ["X-UA-Compatible"],
                  content: "IE=edge",
                },
                children: [],
              },
              { type: "raw", value: "<![endif]-->" },
              {
                type: "element",
                tagName: "meta",
                properties: {
                  httpEquiv: ["Content-Type"],
                  content: "text/html; charset=UTF-8",
                },
                children: [],
              },
              {
                type: "element",
                tagName: "meta",
                properties: {
                  name: "viewport",
                  content: "width=device-width, initial-scale=1",
                },
                children: [],
              },
              {
                type: "element",
                tagName: "style",
                properties: { type: "text/css" },
                children: [
                  {
                    type: "text",
                    value:
                      "#outlook a { padding:0; }\nbody { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }\ntable, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }\nimg { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }\np { display:block;margin:13px 0; }",
                  },
                ],
              },
              { type: "raw", value: "<!--if mso]>" },
              {
                type: "element",
                tagName: "noscript",
                properties: {},
                children: [
                  {
                    type: "element",
                    tagName: "xml",
                    properties: {},
                    children: [
                      {
                        type: "element",
                        tagName: "o:officedocumentsettings",
                        properties: {},
                        children: [
                          {
                            type: "element",
                            tagName: "o:allowpng",
                            properties: {},
                            children: [],
                          },
                          {
                            type: "element",
                            tagName: "o:pixelsperinch",
                            properties: {},
                            children: [{ type: "text", value: "96" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              { type: "raw", value: "<![endif]-->" },
              { type: "raw", value: "<!--if lte mso 11]>" },
              {
                type: "element",
                tagName: "style",
                properties: { type: "text/css" },
                children: [
                  {
                    type: "text",
                    value: ".mj-outlook-group-fix { width:100% !important; }",
                  },
                ],
              },
              { type: "raw", value: "<![endif]-->" },
              {
                type: "element",
                tagName: "style",
                properties: { type: "text/css" },
                children: [
                  {
                    type: "text",
                    value:
                      '\n            noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }\n            @media only screen and (max-width:479px) {\n              .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }\n              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,\n              .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }\n              .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }\n              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }\n              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }\n            }',
                  },
                ],
              },
            ],
          },
          {
            type: "element",
            tagName: "body",
            properties: { style: "word-spacing:normal" },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { style: "" },
                children: [
                  { type: "raw", value: "<!--if mso | IE]>" },
                  {
                    type: "element",
                    tagName: "table",
                    properties: {
                      align: "center",
                      border: 0,
                      cellPadding: "0",
                      cellSpacing: "0",
                      role: "presentation",
                      style: "width:600px",
                      width: 600,
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "tr",
                        properties: {},
                        children: [
                          {
                            type: "element",
                            tagName: "td",
                            properties: {
                              style:
                                "line-height:0px;font-size:0px;mso-line-height-rule:exactly",
                            },
                            children: [
                              { type: "raw", value: "<![endif]-->" },
                              {
                                type: "element",
                                tagName: "div",
                                properties: {
                                  style: "margin:0px auto;max-width:600px",
                                },
                                children: [
                                  {
                                    type: "element",
                                    tagName: "table",
                                    properties: {
                                      align: "center",
                                      border: 0,
                                      cellPadding: "0",
                                      cellSpacing: "0",
                                      role: "presentation",
                                      style: "width:100%",
                                    },
                                    children: [
                                      {
                                        type: "element",
                                        tagName: "tbody",
                                        properties: {},
                                        children: [
                                          {
                                            type: "element",
                                            tagName: "tr",
                                            properties: {},
                                            children: [
                                              {
                                                type: "element",
                                                tagName: "td",
                                                properties: {
                                                  style:
                                                    "direction:ltr;font-size:0px;padding:20px 0;text-align:center",
                                                },
                                                children: [
                                                  {
                                                    type: "raw",
                                                    value: "<!--if mso | IE]>",
                                                  },
                                                  {
                                                    type: "element",
                                                    tagName: "table",
                                                    properties: {
                                                      role: "presentation",
                                                      border: 0,
                                                      cellPadding: 0,
                                                      cellSpacing: 0,
                                                    },
                                                    children: [
                                                      {
                                                        type: "raw",
                                                        value: "<![endif]-->",
                                                      },
                                                      {
                                                        type: "element",
                                                        tagName: "div",
                                                        properties: {
                                                          className: [
                                                            "mj-column-per-100",
                                                            "mj-outlook-group-fix",
                                                          ],
                                                          style:
                                                            "font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%",
                                                        },
                                                        children: [
                                                          {
                                                            type: "element",
                                                            tagName: "table",
                                                            properties: {
                                                              border: 0,
                                                              cellPadding: "0",
                                                              cellSpacing: "0",
                                                              role: "presentation",
                                                              style:
                                                                "vertical-align:top",
                                                              width: "100%",
                                                            },
                                                            children: [
                                                              {
                                                                type: "element",
                                                                tagName:
                                                                  "tbody",
                                                                properties: {},
                                                                children: [
                                                                  {
                                                                    type: "element",
                                                                    tagName:
                                                                      "tr",
                                                                    properties:
                                                                      {},
                                                                    children: [
                                                                      {
                                                                        type: "element",
                                                                        tagName:
                                                                          "td",
                                                                        properties:
                                                                          {
                                                                            align:
                                                                              "center",
                                                                            style:
                                                                              "font-size:0px;padding:10px 25px;word-break:break-word",
                                                                          },
                                                                        children:
                                                                          [
                                                                            {
                                                                              type: "element",
                                                                              tagName:
                                                                                "table",
                                                                              properties:
                                                                                {
                                                                                  border: 0,
                                                                                  cellPadding:
                                                                                    "0",
                                                                                  cellSpacing:
                                                                                    "0",
                                                                                  role: "presentation",
                                                                                  style:
                                                                                    "border-collapse:collapse;border-spacing:0px",
                                                                                },
                                                                              children:
                                                                                [
                                                                                  {
                                                                                    type: "element",
                                                                                    tagName:
                                                                                      "tbody",
                                                                                    properties:
                                                                                      {},
                                                                                    children:
                                                                                      [
                                                                                        {
                                                                                          type: "element",
                                                                                          tagName:
                                                                                            "tr",
                                                                                          properties:
                                                                                            {},
                                                                                          children:
                                                                                            [
                                                                                              {
                                                                                                type: "element",
                                                                                                tagName:
                                                                                                  "td",
                                                                                                properties:
                                                                                                  {
                                                                                                    style:
                                                                                                      "width:[object Object]px",
                                                                                                  },
                                                                                                children:
                                                                                                  [
                                                                                                    {
                                                                                                      type: "element",
                                                                                                      tagName:
                                                                                                        "image",
                                                                                                      properties:
                                                                                                        {
                                                                                                          height:
                                                                                                            "auto",
                                                                                                          src: "/assets/img/logo-small.png",
                                                                                                          style:
                                                                                                            "border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px",
                                                                                                          width:
                                                                                                            "100%",
                                                                                                        },
                                                                                                      children:
                                                                                                        [],
                                                                                                    },
                                                                                                  ],
                                                                                              },
                                                                                            ],
                                                                                        },
                                                                                      ],
                                                                                  },
                                                                                ],
                                                                            },
                                                                          ],
                                                                      },
                                                                    ],
                                                                  },
                                                                  {
                                                                    type: "element",
                                                                    tagName:
                                                                      "tr",
                                                                    properties:
                                                                      {},
                                                                    children: [
                                                                      {
                                                                        type: "element",
                                                                        tagName:
                                                                          "td",
                                                                        properties:
                                                                          {
                                                                            align:
                                                                              "center",
                                                                            style:
                                                                              "font-size:0px;padding:10px 25px;word-break:break-word",
                                                                          },
                                                                        children:
                                                                          [
                                                                            {
                                                                              type: "element",
                                                                              tagName:
                                                                                "p",
                                                                              properties:
                                                                                {
                                                                                  style:
                                                                                    "border-top:solid 4px #F46E43;font-size:1px;margin:0px auto;width:100%",
                                                                                },
                                                                              children:
                                                                                [],
                                                                            },
                                                                            {
                                                                              type: "raw",
                                                                              value:
                                                                                "<!--if mso | IE]>",
                                                                            },
                                                                            {
                                                                              type: "element",
                                                                              tagName:
                                                                                "table",
                                                                              properties:
                                                                                {
                                                                                  align:
                                                                                    "center",
                                                                                  border: 0,
                                                                                  cellPadding:
                                                                                    "0",
                                                                                  cellSpacing:
                                                                                    "0",
                                                                                  style:
                                                                                    "border-top:solid 4px #F46E43;font-size:1px;margin:0px auto;width:0px",
                                                                                  role: "presentation",
                                                                                  width:
                                                                                    "0px",
                                                                                },
                                                                              children:
                                                                                [
                                                                                  {
                                                                                    type: "element",
                                                                                    tagName:
                                                                                      "tr",
                                                                                    properties:
                                                                                      {},
                                                                                    children:
                                                                                      [
                                                                                        {
                                                                                          type: "element",
                                                                                          tagName:
                                                                                            "td",
                                                                                          properties:
                                                                                            {},
                                                                                          children:
                                                                                            [
                                                                                              {
                                                                                                type: "text",
                                                                                                value:
                                                                                                  "&nbsp;",
                                                                                              },
                                                                                            ],
                                                                                        },
                                                                                      ],
                                                                                  },
                                                                                ],
                                                                            },
                                                                            {
                                                                              type: "raw",
                                                                              value:
                                                                                "<![endif]-->",
                                                                            },
                                                                          ],
                                                                      },
                                                                    ],
                                                                  },
                                                                  {
                                                                    type: "element",
                                                                    tagName:
                                                                      "tr",
                                                                    properties:
                                                                      {},
                                                                    children: [
                                                                      {
                                                                        type: "element",
                                                                        tagName:
                                                                          "td",
                                                                        properties:
                                                                          {
                                                                            align:
                                                                              "left",
                                                                            style:
                                                                              "font-size:0px;padding:10px 25px;word-break:break-word",
                                                                          },
                                                                        children:
                                                                          [
                                                                            {
                                                                              type: "element",
                                                                              tagName:
                                                                                "div",
                                                                              properties:
                                                                                {
                                                                                  style:
                                                                                    "font-family:Helvetica;font-size:20px;letter-spacing:none;line-height:1;text-align:left;color:#F45E43",
                                                                                },
                                                                              children:
                                                                                [],
                                                                            },
                                                                          ],
                                                                      },
                                                                    ],
                                                                  },
                                                                ],
                                                              },
                                                            ],
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        type: "raw",
                                                        value:
                                                          "<!--if mso | IE]>",
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
```