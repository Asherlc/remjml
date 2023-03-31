import { VFile } from "vfile";
import remjmlParse from ".";

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
  const vfile = new VFile(mjml);

  const parser = remjmlParse.bind([] as any)();

  const mjmlAst = parser("", vfile);

  expect(mjmlAst).toMatchInlineSnapshot(`
    {
      "attributes": {},
      "children": [
        {
          "position": {
            "end": {
              "column": 3,
              "line": 2,
              "offset": 9,
            },
            "start": {
              "column": 7,
              "line": 1,
              "offset": 6,
            },
          },
          "type": "text",
          "value": "
      ",
        },
        {
          "attributes": {},
          "children": [
            {
              "position": {
                "end": {
                  "column": 5,
                  "line": 3,
                  "offset": 23,
                },
                "start": {
                  "column": 12,
                  "line": 2,
                  "offset": 18,
                },
              },
              "type": "text",
              "value": "
        ",
            },
            {
              "attributes": {},
              "children": [
                {
                  "position": {
                    "end": {
                      "column": 7,
                      "line": 4,
                      "offset": 42,
                    },
                    "start": {
                      "column": 17,
                      "line": 3,
                      "offset": 35,
                    },
                  },
                  "type": "text",
                  "value": "
          ",
                },
                {
                  "attributes": {},
                  "children": [
                    {
                      "position": {
                        "end": {
                          "column": 9,
                          "line": 5,
                          "offset": 62,
                        },
                        "start": {
                          "column": 18,
                          "line": 4,
                          "offset": 53,
                        },
                      },
                      "type": "text",
                      "value": "
            ",
                    },
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
                    {
                      "position": {
                        "end": {
                          "column": 7,
                          "line": 8,
                          "offset": 193,
                        },
                        "start": {
                          "column": 22,
                          "line": 7,
                          "offset": 186,
                        },
                      },
                      "type": "text",
                      "value": "
          ",
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
                {
                  "position": {
                    "end": {
                      "column": 5,
                      "line": 9,
                      "offset": 210,
                    },
                    "start": {
                      "column": 19,
                      "line": 8,
                      "offset": 205,
                    },
                  },
                  "type": "text",
                  "value": "
        ",
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
            {
              "position": {
                "end": {
                  "column": 3,
                  "line": 10,
                  "offset": 226,
                },
                "start": {
                  "column": 18,
                  "line": 9,
                  "offset": 223,
                },
              },
              "type": "text",
              "value": "
      ",
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
        {
          "position": {
            "end": {
              "column": 1,
              "line": 11,
              "offset": 237,
            },
            "start": {
              "column": 13,
              "line": 10,
              "offset": 236,
            },
          },
          "type": "text",
          "value": "
    ",
        },
      ],
      "position": {
        "end": {
          "column": 8,
          "line": 11,
          "offset": 244,
        },
        "start": {
          "column": 1,
          "line": 1,
          "offset": 0,
        },
      },
      "type": "mjml",
    }
  `);
});

it("parses an mjml section ", () => {
  const mjml = `<mj-section></mj-section>`;
  const vfile = new VFile(mjml);

  expect(remjmlParse.bind([] as any)()("foo", vfile)).toEqual({
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
  });
});
