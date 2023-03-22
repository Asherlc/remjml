import { BoxWidths } from "../helpers/get-box-widths";
import { min } from "lodash-es";
import type { MjColumn, MjHero, MjText, MjTextAttributes } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";
import { Width } from "../helpers/width-parser";

const DEFAULT_ATTRIBUTES: Pick<
  MjTextAttributes,
  | "color"
  | "font-family"
  | "font-size"
  | "line-height"
  | "letter-spacing"
  | "align"
  | "padding"
> = {
  color: "#000000",
  "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
  "font-size": "13px",
  "line-height": "1",
  "letter-spacing": "none",
  align: "left",
  padding: "10px 25px",
};

type TextParent = MjHero | MjColumn;

function getContentWidth(attributes: MjTextAttributes, context: Context) {
  const width: Width = attributes.width
    ? new Width(attributes.width)
    : new Width(Infinity);

  const { box } = new BoxWidths(attributes, width);

  return min([box, width]);
}

export function mjText(
  node: MjText,
  parent: TextParent,
  options: Options,
  context: Context
): HElement {
  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const hDiv = h(
    "div",
    {
      style: jsonToCss({
        "font-family": attributes["font-family"],
        "font-size": attributes["font-size"],
        "font-style": attributes["font-style"],
        "font-weight": attributes["font-weight"],
        "letter-spacing": attributes["letter-spacing"],
        "line-height": attributes["line-height"],
        "text-align": attributes["align"],
        "text-decoration": attributes["text-decoration"],
        "text-transform": attributes["text-transform"],
        color: attributes["color"],
        height: attributes["height"],
      }),
    },
    node.children[0].value
  );

  let hNode: HElement;

  if (attributes["height"]) {
    const hTd = h("td", {
      height: attributes.height,
      style: jsonToCss({
        "vertical-align": "top",
        height: attributes.height,
      }),
    });

    const hTr = h("tr", {}, hTd);

    hNode = h(
      "table",
      { role: "presentation", border: 0, cellpadding: 0, cellspacing: 0 },
      hTr
    );
  } else {
    hNode = hDiv;
  }

  return addPosition(node, hNode);
}
