import type { MjButton } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import { addPosition } from "../addPosition";
import type { Element as HElement, RootContent as HRootContent } from "hast";
import { Attributes } from "../helpers/Attributes";
import type { Context } from "../types";
import { jsonToCss } from "../helpers/json-to-css";
import type { Property } from "csstype";
import type { Parts } from "units-css";
import units from "units-css";
import { BoxWidth } from "../helpers/BoxWidth";
import type { PaddingValue } from "../helpers/ShorthandCssProperties";
import { ShorthandCssProperties } from "../helpers/ShorthandCssProperties";
import { one } from "../traverse";

export const DEFAULT_ATTRIBUTES: Pick<
  MjButton["attributes"],
  | "align"
  | "background-color"
  | "border"
  | "border-radius"
  | "color"
  | "font-family"
  | "font-size"
  | "font-weight"
  | "inner-padding"
  | "line-height"
  | "padding"
  | "target"
  | "text-decoration"
  | "text-transform"
  | "vertical-align"
> = {
  align: "center",
  "background-color": "#414141",
  border: "none",
  "border-radius": "3px",
  color: "#ffffff",
  "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
  "font-size": "13px",
  "font-weight": "normal",
  "inner-padding": "10px 25px",
  "line-height": "120%",
  padding: "10px 25px",
  target: "_blank",
  "text-decoration": "none",
  "text-transform": "none",
  "vertical-align": "middle",
};

class AWidth {
  #attributes: Attributes<MjButton["attributes"]>;
  #containerWidth: Parts;

  constructor(
    attributes: Attributes<MjButton["attributes"]>,
    containerWidth: Parts
  ) {
    this.#attributes = attributes;
    this.#containerWidth = containerWidth;
  }

  get #innerPadding(): { left: number; right: number } {
    const innerPadding = new ShorthandCssProperties<PaddingValue>({
      top: undefined,
      bottom: undefined,
      right: undefined,
      left: undefined,
      full: this.#attributes.get("inner-padding"),
      name: "padding",
    });

    return {
      left: innerPadding.left?.value || 0,
      right: innerPadding.right?.value ?? 0,
    };
  }

  get #width(): Parts | null {
    const width = this.#attributes.get("width");
    if (!width) return null;
    return units.parse(width);
  }

  get #boxWidth(): BoxWidth {
    return new BoxWidth(this.#attributes.toHash(), this.#containerWidth);
  }

  get width(): Property.Width | undefined {
    // impossible to handle percents because it depends on padding and text width
    if (this.#width?.unit !== "px") return undefined;

    return `${
      this.#width.value -
      this.#innerPadding.left -
      this.#innerPadding.right -
      this.#boxWidth.borders
    }px`;
  }
}

export function mjButton(
  node: MjButton,
  _parent: null,
  options: Options,
  context: Context
): HElement {
  const attributes = new Attributes<MjButton["attributes"]>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES
  );

  if (!context.containerWidth) {
    throw new Error(`Context must have container width`);
  }

  const tag = attributes.get("href") ? "a" : "p";

  const children: HRootContent[] = node.children.flatMap((textChild) => {
    const hChild = one(textChild, node, options, context);
    return hChild;
  });

  const tableNode = h(
    "table",
    {
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      style: jsonToCss({
        borderCollapse: "separate",
        width: attributes.get("width"),
        lineHeight: "100%",
      }),
    },
    h(
      "tbody",
      h(
        "tr",
        h(
          "td",
          {
            align: "center",
            bgcolor:
              attributes.get("background-color") === "none"
                ? undefined
                : attributes.get("background-color"),
            role: "presentation",
            style: jsonToCss({
              border: attributes.get("border"),
              borderBottom: attributes.get("border-bottom"),
              borderLeft: attributes.get("border-left"),
              borderRadius: attributes.get("border-radius"),
              borderRight: attributes.get("border-right"),
              borderTop: attributes.get("border-top"),
              cursor: "auto",
              fontStyle: attributes.get("font-style"),
              height: attributes.get("height"),
              msoPaddingAlt: attributes.get("inner-padding"),
              textAlign: attributes.get("text-align"),
              background: attributes.get("background-color"),
            }),
            valign: attributes.get("vertical-align"),
          },
          h(
            tag,
            {
              href: attributes.get("href"),
              name: attributes.get("name"),
              rel: attributes.get("rel"),
              title: attributes.get("title"),
              style: jsonToCss({
                display: "inline-block",
                width: new AWidth(
                  attributes,
                  units.parse(context.containerWidth)
                ).width,
                background: attributes.get("background-color"),
                color: attributes.get("color"),
                fontFamily: attributes.get("font-family"),
                fontSize: attributes.get("font-size"),
                fontStyle: attributes.get("font-style"),
                fontWeight: attributes.get("font-weight"),
                lineHeight: attributes.get("line-height"),
                letterSpacing: attributes.get("letter-spacing"),
                margin: "0",
                textDecoration: attributes.get("text-decoration"),
                textTransform: attributes.get(
                  "text-transform"
                ) as Property.TextTransform,
                padding: attributes.get("inner-padding"),
                msoPaddingAlt: "0px",
                borderRadius: attributes.get("border-radius"),
              }),
              target: tag === "a" ? attributes.get("target") : undefined,
            },
            children
          )
        )
      )
    )
  );

  return addPosition(node, tableNode);
}
