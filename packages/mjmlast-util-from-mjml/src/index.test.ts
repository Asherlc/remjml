import { fromMjml } from ".";

it("converts mjml into mjmlast", () => {
  const mjml = `<mjml version="3.3.3">
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
        <mj-image align="center" padding="10px 25px" src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png" width="128px"></mj-image>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const mjmlast = fromMjml(mjml);

  expect(mjmlast).toEqual({
    attributes: {
      version: "3.3.3",
    },
    children: [
      {
        position: {
          end: {
            column: 3,
            line: 2,
            offset: 25,
          },
          start: {
            column: 23,
            line: 1,
            offset: 22,
          },
        },
        type: "text",
        value: "\n  ",
      },
      {
        attributes: {
          "background-color": "#F4F4F4",
          color: "#55575d",
          "font-family": "Arial, sans-serif",
        },
        children: [
          {
            position: {
              end: {
                column: 5,
                line: 3,
                offset: 114,
              },
              start: {
                column: 87,
                line: 2,
                offset: 109,
              },
            },
            type: "text",
            value: "\n",
          },
          {
            attributes: {
              "background-color": "#C1272D",
              "background-repeat": "repeat",
              padding: "20px 0",
              "text-align": "center",
              "vertical-align": "top",
            },
            children: [
              {
                position: {
                  end: {
                    column: 7,
                    line: 4,
                    offset: 245,
                  },
                  start: {
                    column: 129,
                    line: 3,
                    offset: 238,
                  },
                },
                type: "text",
                value: "",
              },
              {
                attributes: {},
                children: [
                  {
                    position: {
                      end: {
                        column: 9,
                        line: 5,
                        offset: 265,
                      },
                      start: {
                        column: 18,
                        line: 4,
                        offset: 256,
                      },
                    },
                    type: "text",
                    value: "",
                  },
                  {
                    attributes: {
                      align: "center",
                      padding: "10px 25px",
                      src: "http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png",
                      width: "128px",
                    },
                    children: [],
                    position: {
                      end: {
                        column: 131,
                        line: 5,
                        offset: 387,
                      },
                      start: {
                        column: 9,
                        line: 5,
                        offset: 265,
                      },
                    },
                    type: "mj-image",
                  },
                  {
                    position: {
                      end: {
                        column: 7,
                        line: 6,
                        offset: 394,
                      },
                      start: {
                        column: 131,
                        line: 5,
                        offset: 387,
                      },
                    },
                    type: "text",
                    value: "",
                  },
                ],
                position: {
                  end: {
                    column: 19,
                    line: 6,
                    offset: 406,
                  },
                  start: {
                    column: 7,
                    line: 4,
                    offset: 245,
                  },
                },
                type: "mj-column",
              },
              {
                position: {
                  end: {
                    column: 5,
                    line: 7,
                    offset: 411,
                  },
                  start: {
                    column: 19,
                    line: 6,
                    offset: 406,
                  },
                },
                type: "text",
                value: "",
              },
            ],
            position: {
              end: {
                column: 18,
                line: 7,
                offset: 424,
              },
              start: {
                column: 5,
                line: 3,
                offset: 114,
              },
            },
            type: "mj-section",
          },
          {
            position: {
              end: {
                column: 3,
                line: 8,
                offset: 427,
              },
              start: {
                column: 18,
                line: 7,
                offset: 424,
              },
            },
            type: "text",
            value: "",
          },
        ],
        position: {
          end: {
            column: 13,
            line: 8,
            offset: 437,
          },
          start: {
            column: 3,
            line: 2,
            offset: 25,
          },
        },
        type: "mj-body",
      },
      {
        position: {
          end: {
            column: 1,
            line: 9,
            offset: 438,
          },
          start: {
            column: 13,
            line: 8,
            offset: 437,
          },
        },
        type: "text",
        value: "",
      },
    ],
    type: "mjml",
  });
});

it("converts mjml with an ampersand in a url into mjmlast", () => {
  const mjml = `<mjml version="3.3.3">
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    <mj-section background-color="#C1272D" background-repeat="repeat" padding="20px 0" text-align="center" vertical-align="top">
      <mj-column>
      <mj-text><a href="http://google.com?foo=bar&baz=bar">link</a></mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

  const mjmlast = fromMjml(mjml);

  expect(mjmlast).toMatchInlineSnapshot(`
    {
      "attributes": {
        "version": "3.3.3",
      },
      "children": [
        {
          "position": {
            "end": {
              "column": 3,
              "line": 2,
              "offset": 25,
            },
            "start": {
              "column": 23,
              "line": 1,
              "offset": 22,
            },
          },
          "type": "text",
          "value": "
      ",
        },
        {
          "attributes": {
            "background-color": "#F4F4F4",
            "color": "#55575d",
            "font-family": "Arial, sans-serif",
          },
          "children": [
            {
              "position": {
                "end": {
                  "column": 5,
                  "line": 3,
                  "offset": 114,
                },
                "start": {
                  "column": 87,
                  "line": 2,
                  "offset": 109,
                },
              },
              "type": "text",
              "value": "
        ",
            },
            {
              "attributes": {
                "background-color": "#C1272D",
                "background-repeat": "repeat",
                "padding": "20px 0",
                "text-align": "center",
                "vertical-align": "top",
              },
              "children": [
                {
                  "position": {
                    "end": {
                      "column": 7,
                      "line": 4,
                      "offset": 245,
                    },
                    "start": {
                      "column": 129,
                      "line": 3,
                      "offset": 238,
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
                          "line": 5,
                          "offset": 263,
                        },
                        "start": {
                          "column": 18,
                          "line": 4,
                          "offset": 256,
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
                          "children": [
                            {
                              "position": {
                                "end": {
                                  "column": 64,
                                  "line": 5,
                                  "offset": 320,
                                },
                                "start": {
                                  "column": 60,
                                  "line": 5,
                                  "offset": 316,
                                },
                              },
                              "type": "text",
                              "value": "link",
                            },
                          ],
                          "position": {
                            "end": {
                              "column": 68,
                              "line": 5,
                              "offset": 324,
                            },
                            "start": {
                              "column": 16,
                              "line": 5,
                              "offset": 272,
                            },
                          },
                          "properties": {
                            "href": "http://google.com?foo=bar&baz=bar",
                          },
                          "tagName": "a",
                          "type": "element",
                        },
                      ],
                      "position": {
                        "end": {
                          "column": 78,
                          "line": 5,
                          "offset": 334,
                        },
                        "start": {
                          "column": 7,
                          "line": 5,
                          "offset": 263,
                        },
                      },
                      "type": "mj-text",
                    },
                    {
                      "position": {
                        "end": {
                          "column": 7,
                          "line": 6,
                          "offset": 341,
                        },
                        "start": {
                          "column": 78,
                          "line": 5,
                          "offset": 334,
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
                      "line": 6,
                      "offset": 353,
                    },
                    "start": {
                      "column": 7,
                      "line": 4,
                      "offset": 245,
                    },
                  },
                  "type": "mj-column",
                },
                {
                  "position": {
                    "end": {
                      "column": 5,
                      "line": 7,
                      "offset": 358,
                    },
                    "start": {
                      "column": 19,
                      "line": 6,
                      "offset": 353,
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
                  "line": 7,
                  "offset": 371,
                },
                "start": {
                  "column": 5,
                  "line": 3,
                  "offset": 114,
                },
              },
              "type": "mj-section",
            },
            {
              "position": {
                "end": {
                  "column": 3,
                  "line": 8,
                  "offset": 374,
                },
                "start": {
                  "column": 18,
                  "line": 7,
                  "offset": 371,
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
              "line": 8,
              "offset": 384,
            },
            "start": {
              "column": 3,
              "line": 2,
              "offset": 25,
            },
          },
          "type": "mj-body",
        },
        {
          "position": {
            "end": {
              "column": 1,
              "line": 9,
              "offset": 385,
            },
            "start": {
              "column": 13,
              "line": 8,
              "offset": 384,
            },
          },
          "type": "text",
          "value": "
    ",
        },
      ],
      "type": "mjml",
    }
  `);
});
