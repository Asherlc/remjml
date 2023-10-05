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
        attributes: {
          "background-color": "#F4F4F4",
          color: "#55575d",
          "font-family": "Arial, sans-serif",
        },
        children: [
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
                attributes: {},
                children: [
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
    ],
    type: "mjml",
  });
});

it("converts mjml with an ampersand in a url into mjmlast", () => {
  const mjml = `<mjml version="3.3.3">
  <mj-body>
    <mj-section>
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
                          "children": [
                            {
                              "position": {
                                "end": {
                                  "column": 64,
                                  "line": 5,
                                  "offset": 133,
                                },
                                "start": {
                                  "column": 60,
                                  "line": 5,
                                  "offset": 129,
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
                              "offset": 137,
                            },
                            "start": {
                              "column": 16,
                              "line": 5,
                              "offset": 85,
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
                          "offset": 147,
                        },
                        "start": {
                          "column": 7,
                          "line": 5,
                          "offset": 76,
                        },
                      },
                      "type": "mj-text",
                    },
                  ],
                  "position": {
                    "end": {
                      "column": 19,
                      "line": 6,
                      "offset": 166,
                    },
                    "start": {
                      "column": 7,
                      "line": 4,
                      "offset": 58,
                    },
                  },
                  "type": "mj-column",
                },
              ],
              "position": {
                "end": {
                  "column": 18,
                  "line": 7,
                  "offset": 184,
                },
                "start": {
                  "column": 5,
                  "line": 3,
                  "offset": 39,
                },
              },
              "type": "mj-section",
            },
          ],
          "position": {
            "end": {
              "column": 13,
              "line": 8,
              "offset": 197,
            },
            "start": {
              "column": 3,
              "line": 2,
              "offset": 25,
            },
          },
          "type": "mj-body",
        },
      ],
      "type": "mjml",
    }
  `);
});

it("converts mjml with mj-all into mjmlast", () => {
  const mjml = `<mjml version="3.3.3">
      <mj-attributes>
        <mj-all padding="10px"></mj-all>
      </mj-attributes>
    </mj-head>
  <mj-body>
    <mj-head>
    <mj-section>
      <mj-column>
        <mj-image src="http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png" width="128px"></mj-image>
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
          "attributes": {},
          "children": [
            {
              "attributes": {
                "padding": "10px",
              },
              "children": [],
              "position": {
                "end": {
                  "column": 41,
                  "line": 3,
                  "offset": 85,
                },
                "start": {
                  "column": 9,
                  "line": 3,
                  "offset": 53,
                },
              },
              "type": "mj-all",
            },
          ],
          "position": {
            "end": {
              "column": 23,
              "line": 4,
              "offset": 108,
            },
            "start": {
              "column": 7,
              "line": 2,
              "offset": 29,
            },
          },
          "type": "mj-attributes",
        },
        {
          "attributes": {},
          "children": [
            {
              "attributes": {},
              "children": [
                {
                  "attributes": {
                    "src": "http://gkq4.mjt.lu/img/gkq4/b/18rxz/1h3k4.png",
                    "width": "128px",
                  },
                  "children": [],
                  "position": {
                    "end": {
                      "column": 96,
                      "line": 10,
                      "offset": 280,
                    },
                    "start": {
                      "column": 9,
                      "line": 10,
                      "offset": 193,
                    },
                  },
                  "type": "mj-image",
                },
              ],
              "position": {
                "end": {
                  "column": 19,
                  "line": 11,
                  "offset": 299,
                },
                "start": {
                  "column": 7,
                  "line": 9,
                  "offset": 173,
                },
              },
              "type": "mj-column",
            },
          ],
          "position": {
            "end": {
              "column": 18,
              "line": 12,
              "offset": 317,
            },
            "start": {
              "column": 5,
              "line": 8,
              "offset": 154,
            },
          },
          "type": "mj-section",
        },
      ],
      "type": "mjml",
    }
  `);
});
