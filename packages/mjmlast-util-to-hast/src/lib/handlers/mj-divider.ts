// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units, { Parts } from "units-css";
import { jsonToCss } from "../helpers/json-to-css";
import type { MjColumn, MjDivider, MjDividerAttributes } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Context } from "../types";
import type { Element as HElement } from "hast";
import {
  beginConditionalComment,
  endConditionalComment,
  MSO_OR_IE,
} from "../helpers/conditional-comment";
import { Attributes } from "../helpers/Attributes";
import { ShorthandCssProperties } from "../helpers/ShorthandCssProperties";

export const DEFAULT_ATTRIBUTES: Pick<
  MjDividerAttributes,
  | "align"
  | "border-color"
  | "border-style"
  | "border-width"
  | "padding"
  | "width"
> = {
  align: "center",
  "border-color": "#000000",
  "border-style": "solid",
  "border-width": "4px",
  padding: "10px 25px",
  width: "100%",
};

type DividerParent = MjColumn;

function getMargin(alignAttribute: MjDividerAttributes["align"] | undefined) {
  if (alignAttribute === "left") {
    return "0px";
  } else if (alignAttribute === "right") {
    return "0px 0px 0px auto";
  }

  return "0px auto";
}

function getOutlookWidth(
  containerWidth: Parts,
  attributes: Attributes<MjDividerAttributes>
): string {
  const padding = new ShorthandCssProperties<Parts>({
    name: "padding",
    top: attributes.get("padding-top"),
    bottom: attributes.get("padding-bottom"),
    left: attributes.get("padding-left"),
    right: attributes.get("padding-right"),
    full: attributes.get("padding"),
  });
  const paddingSize = (padding.left?.value || 0) + (padding.right?.value || 0);

  const widthAttribute = attributes.get("width");

  if (!widthAttribute) {
    throw new Error(`No width attribute`);
  }

  const width = units.parse(widthAttribute);

  switch (width.unit) {
    case "%": {
      const effectiveWidth = containerWidth.value - paddingSize;
      const percentMultiplier = width.value / 100;
      return `${effectiveWidth * percentMultiplier}px`;
    }
    case "px":
      return width.toString();
    default:
      return `${containerWidth.value - paddingSize}px`;
  }
}

export function mjDivider(
  node: MjDivider,
  parent: DividerParent,
  options: Options,
  context: Context
): HElement[] {
  if (!context.containerWidth) {
    throw new Error(`Context must have container width`);
  }

  const attributes = new Attributes<MjDividerAttributes>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES
  );
  const styles = {
    borderTop: ["style", "width", "color"]
      .map((attr) =>
        attributes.get(`border-${attr}` as keyof MjDividerAttributes)
      )
      .join(" "),
    fontSize: "1px",
    margin: getMargin(attributes.get("align")),
    width: attributes.get("width"),
  };

  const hP = h("p", {
    style: jsonToCss(styles),
  });

  const hTd = h("td", "&nbsp;");
  const hTr = h("tr", hTd);

  const outlookWidth = getOutlookWidth(
    units.parse(context.containerWidth),
    attributes
  );

  const hTable = h(
    "table",
    {
      align: attributes.get("align"),
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      style: jsonToCss({
        ...styles,
        width: outlookWidth,
      }),
      role: "presentation",
      width: outlookWidth,
    },
    hTr
  );

  const openConditional = beginConditionalComment({
    expression: MSO_OR_IE,
    type: "downlevel-hidden",
  });
  const endConditional = endConditionalComment({
    type: "downlevel-hidden",
  });

  return [hP, openConditional, hTable, endConditional];
}
