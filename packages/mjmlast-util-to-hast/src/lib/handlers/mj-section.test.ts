import { MjSection } from "mjmlast";
import { mjSection } from "./mj-section";

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

  expect(mjSection(section, null, {}, {})).toEqual([
    {
      type: "raw",
      value: "<!--[if mso | IE]>",
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              children: [
                                {
                                  children: [
                                    {
                                      type: "raw",
                                      value: "<!--[if mso | IE]>",
                                    },
                                    {
                                      children: [
                                        {
                                          type: "raw",
                                          value: "<![endif]-->",
                                        },
                                        {
                                          type: "raw",
                                          value: "<!--[if mso | IE]>",
                                        },
                                      ],
                                      properties: {
                                        border: 0,
                                        cellPadding: 0,
                                        cellSpacing: 0,
                                        role: "presentation",
                                      },
                                      tagName: "table",
                                      type: "element",
                                    },
                                  ],
                                  properties: {
                                    style:
                                      "direction:ltr;font-size:0px;padding:20px 0;text-align:center",
                                  },
                                  tagName: "td",
                                  type: "element",
                                },
                              ],
                              properties: {},
                              tagName: "tr",
                              type: "element",
                            },
                          ],
                          properties: {},
                          tagName: "tbody",
                          type: "element",
                        },
                      ],
                      properties: {
                        align: "center",
                        border: 0,
                        cellPadding: "0",
                        cellSpacing: "0",
                        role: "presentation",
                        style: "width:100%",
                      },
                      tagName: "table",
                      type: "element",
                    },
                  ],
                  properties: {
                    style: "margin:0px auto",
                  },
                  tagName: "div",
                  type: "element",
                },
                {
                  type: "raw",
                  value: "<!--[if mso | IE]>",
                },
              ],
              properties: {
                style:
                  "line-height:0px;font-size:0px;mso-line-height-rule:exactly",
              },
              tagName: "td",
              type: "element",
            },
          ],
          properties: {},
          tagName: "tr",
          type: "element",
        },
      ],
      properties: {
        align: "center",
        border: 0,
        cellPadding: "0",
        cellSpacing: "0",
        role: "presentation",
        style: "",
      },
      tagName: "table",
      type: "element",
    },
    {
      type: "raw",
      value: "<![endif]-->",
    },
  ]);
});
