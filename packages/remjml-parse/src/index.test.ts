import remjmlParse from ".";
import { unified } from "unified";

it("parses mjml", () => {
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

  const output = unified().use(remjmlParse).parse(mjml);

  expect(output).toMatchInlineSnapshot(`
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
                        "background-color": "#f45e43",
                        "color": "white",
                        "font-family": "Helvetica",
                      },
                      "children": [
                        {
                          "position": {
                            "end": {
                              "column": 10,
                              "line": 7,
                              "offset": 174,
                            },
                            "start": {
                              "column": 85,
                              "line": 5,
                              "offset": 138,
                            },
                          },
                          "type": "text",
                          "value": "
              Don't click me!
             ",
                        },
                      ],
                      "position": {
                        "end": {
                          "column": 22,
                          "line": 7,
                          "offset": 186,
                        },
                        "start": {
                          "column": 9,
                          "line": 5,
                          "offset": 62,
                        },
                      },
                      "type": "mj-button",
                    },
                  ],
                  "position": {
                    "end": {
                      "column": 19,
                      "line": 8,
                      "offset": 205,
                    },
                    "start": {
                      "column": 7,
                      "line": 4,
                      "offset": 42,
                    },
                  },
                  "type": "mj-column",
                },
              ],
              "position": {
                "end": {
                  "column": 18,
                  "line": 9,
                  "offset": 223,
                },
                "start": {
                  "column": 5,
                  "line": 3,
                  "offset": 23,
                },
              },
              "type": "mj-section",
            },
          ],
          "position": {
            "end": {
              "column": 13,
              "line": 10,
              "offset": 236,
            },
            "start": {
              "column": 3,
              "line": 2,
              "offset": 9,
            },
          },
          "type": "mj-body",
        },
      ],
      "type": "mjml",
    }
  `);
});

it("parses an mjml section ", () => {
  const mjml = `<mj-section></mj-section>`;
  const output = unified().use(remjmlParse).parse(mjml);

  expect(output).toEqual({
    attributes: {},
    children: [],
    type: "mj-section",
  });
});
