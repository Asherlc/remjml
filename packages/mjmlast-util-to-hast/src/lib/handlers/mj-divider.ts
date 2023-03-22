import { jsonToCss } from "../helpers/json-to-css";
import type {
  MjAttributes,
  MjColumn,
  MjDivider,
  MjDividerAttributes,
  UniversalAttributes,
} from "mjmlast";
import { h } from "hastscript";
import { Context, Options } from "..";
import { Element as HElement } from "hast";
import {
  beginConditionalComment,
  endConditionalComment,
} from "../helpers/conditional-comment";
import { Attributes } from "../helpers/Attributes";
import { Width } from "../helpers/width-parser";

const DEFAULT_ATTRIBUTES: Pick<
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

function attributesWithDefaults(
  attributes: MjDividerAttributes & UniversalAttributes
): MjDividerAttributes & UniversalAttributes {
  return { ...DEFAULT_ATTRIBUTES, ...attributes };
}

type DividerParent = MjColumn;

function getMargin(alignAttribute: MjDividerAttributes["align"]) {
  if (alignAttribute === "left") {
    return "0px";
  } else if (alignAttribute === "right") {
    return "0px 0px 0px auto";
  }

  return "0px auto";
}

function getOutlookWidth(
  containerWidth: Width,
  attributes: Attributes<MjDividerAttributes>
): string {
  const paddingSize =
    attributes.getShorthandValue("padding", "left") +
    attributes.getShorthandValue("padding", "right");

  const width = new Width(attributes.get("width"));

  switch (width.unit) {
    case "%": {
      const effectiveWidth = containerWidth.width - paddingSize;
      const percentMultiplier = width.width / 100;
      return `${effectiveWidth * percentMultiplier}px`;
    }
    case "px":
      return width.toString();
    default:
      return `${containerWidth.width - paddingSize}px`;
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

  const attributes = attributesWithDefaults(node.attributes || {});
  const styles = {
    borderTop: ["style", "width", "color"]
      .map((attr) => attributes[`border-${attr}` as keyof MjDividerAttributes])
      .join(" "),
    fontSize: "1px",
    margin: getMargin(attributes.align),
    width: attributes.width,
  };

  const hP = h("p", {
    style: jsonToCss(styles),
  });

  const hTd = h("td", "&nbsp;");
  const hTr = h("tr", hTd);

  const outlookWidth = getOutlookWidth(
    new Width(context.containerWidth),
    new Attributes(attributes)
  );

  const hTable = h(
    "table",
    {
      align: attributes.align,
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
    expression: "mso | IE",
    type: "downlevel-hidden",
  });
  const endConditional = endConditionalComment({
    type: "downlevel-hidden",
  });

  return [hP, openConditional, hTable, endConditional];
}
