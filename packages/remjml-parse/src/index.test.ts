import { VFile } from "vfile";
import remjmlParse from ".";

it("parses mjml", () => {
  const mjml = `<mjml>
</mjml>`;

  const vfile = new VFile(mjml);

  expect(remjmlParse.bind([])()("foo", vfile)).toMatchInlineSnapshot(`
    {
      "attributes": {},
      "children": [
        {
          "position": {
            "end": {
              "column": 1,
              "line": 2,
              "offset": 7,
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
      ],
      "position": {
        "end": {
          "column": 8,
          "line": 2,
          "offset": 14,
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
