import type { MjText, ParentComponent } from "mjmlast";
import { h } from "hastscript";
import { addPosition } from "../addPosition";
import type { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";
import { Attributes } from "../helpers/attributes/Attributes";
import type { Context } from "../types";
import type { Options } from "..";

export const DEFAULT_ATTRIBUTES: Pick<
  MjText["attributes"],
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

export function mjText(
  node: MjText,
  _parent: ParentComponent,
  _options: Options,
  context: Context
): HElement {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClassesAttributes,
    mjAllAttributes: context.mjAllAttributes,
  });

  const hDiv: HElement = h(
    "div",
    {
      style: jsonToCss({
        fontFamily: attributes.get("font-family"),
        fontSize: attributes.get("font-size"),
        fontStyle: attributes.get("font-style"),
        fontWeight: attributes.get("font-weight"),
        letterSpacing: attributes.get("letter-spacing"),
        lineHeight: attributes.get("line-height"),
        textAlign: attributes.get("align"),
        textDecoration: attributes.get("text-decoration"),
        textTransform: attributes.get("text-transform"),
        color: attributes.get("color"),
        height: attributes.get("height"),
      }),
    },
    node.children as HElement[]
  );

  let hNode: HElement;

  if (attributes.get("height")) {
    const hTd = h("td", {
      height: attributes.get("height"),
      style: jsonToCss({
        verticalAlign: "top",
        height: attributes.get("height"),
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
