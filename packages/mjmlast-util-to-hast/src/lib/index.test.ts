import { toHtml } from "hast-util-to-html";
import type { MjAttributes, MjmlRoot, MjSection } from "mjmlast";
import { toHast } from ".";

const mjmlAst: MjmlRoot = {
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
                    align: "center",
                  },
                  type: "mj-divider",
                },
                {
                  attributes: {
                    color: "#F45E43",
                    "font-family": "Helvetica",
                    "font-size": "20px",
                    align: "center",
                    "background-color": "",
                    "container-background-color": "",
                    "font-style": "",
                    "font-weight": "",
                    height: "",
                    "letter-spacing": "",
                    "line-height": "",
                    "padding-bottom": "",
                    "padding-left": "",
                    "padding-right": "",
                    "padding-top": "",
                    padding: "",
                    "text-decoration": "",
                    "text-transform": "",
                    "vertical-align": "middle",
                  },
                  children: [
                    {
                      type: "text",
                      value: "Hello World",
                    },
                  ],
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
};

const mjAttributes: MjAttributes = {
  type: "mj-attributes",
  children: [
    {
      type: "mj-class",
      attributes: {
        name: "foo",
        align: "up",
      },
    },
  ],
};
const mjmlAstWithMjClass: MjmlRoot = {
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
                    "mj-class": "foo",
                  },
                  type: "mj-text",
                  children: [],
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
    {
      type: "mj-head",
      children: [mjAttributes],
    },
  ],
  type: "mjml",
};

it("converts to mjmlast to hast", () => {
  const hast = toHast(mjmlAst);

  expect(hast).toMatchSnapshot();
});

describe("with mj-classes", () => {
  it("converts mjmlast to hast", () => {
    const hast = toHast(mjmlAstWithMjClass);

    expect(hast).toMatchSnapshot();
  });
});

it("returns a hast that can `hast-util-from-html` can stringify", () => {
  const hast = toHast(mjmlAst);

  expect(toHtml(hast as any, { allowDangerousHtml: true })).toMatchSnapshot();
});

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

  const hast = toHast(section);

  expect(hast).toMatchSnapshot();
});
