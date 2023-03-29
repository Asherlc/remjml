# mjmlast-util-from-mjml

Convert mjml to mjmlast

## Example

mjml:

```xml
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-button font-family="Helvetica" background-color="#f45e43" color="white">
          Don't click me!
         </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

result:

```javascript
{
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
        value: "",
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
            value: "",
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
  }
```