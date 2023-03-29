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

  const hast = mjSection(section, null, {}, {});

  expect(hast).toMatchInlineSnapshot(`
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
    }
  `);
});
