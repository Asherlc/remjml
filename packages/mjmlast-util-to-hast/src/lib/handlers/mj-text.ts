import type { MjText, MjTextAttributes } from "mjmlast";
import { h } from "hastscript";
import { addPosition } from "..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";
import { Property } from "csstype";

export const DEFAULT_ATTRIBUTES: Pick<
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

export function mjText(node: MjText): HElement {
  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const hDiv: HElement = h(
    "div",
    {
      style: jsonToCss({
        fontFamily: attributes["font-family"],
        fontSize: attributes["font-size"],
        fontStyle: attributes["font-style"],
        fontWeight: attributes["font-weight"],
        letterSpacing: attributes["letter-spacing"],
        lineHeight: attributes["line-height"],
        textAlign: attributes.align,
        textDecoration: attributes["text-decoration"],
        textTransform: attributes["text-transform"] as Property.TextTransform,
        color: attributes.color,
        height: attributes.height,
      }),
    },
    node.children as HElement[]
  );

  let hNode: HElement;

  if (attributes.height) {
    const hTd = h("td", {
      height: attributes.height,
      style: jsonToCss({
        verticalAlign: "top",
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
