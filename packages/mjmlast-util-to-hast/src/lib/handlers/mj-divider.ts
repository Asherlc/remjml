// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import units from "units-css";
import { jsonToCss } from "../helpers/json-to-css";
import type { MjColumn, MjDivider, MjDividerAttributes } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Context } from "../types";
import type { Element as HElement } from "hast";
import { MSO_OR_IE } from "../helpers/conditional-comments/conditional-comment";
import { Attributes } from "../helpers/attributes/Attributes";
import { DirectionalShorthandCssProperties } from "../helpers/shorthandCss/DirectionalShorthandCssProperties";
import { DownlevelHidden } from "../helpers/conditional-comments/DownlevelHidden";

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

function getMargin(alignAttribute: string | undefined) {
  if (alignAttribute === "left") {
    return "0px";
  } else if (alignAttribute === "right") {
    return "0px 0px 0px auto";
  }

  return "0px auto";
}

function getOutlookWidth(
  containerWidth: Parts,
  attributes: Attributes
): string {
  const padding = new DirectionalShorthandCssProperties<Parts>({
    name: "padding",
    top: attributes.get("padding-top")?.toString(),
    bottom: attributes.get("padding-bottom")?.toString(),
    left: attributes.get("padding-left")?.toString(),
    right: attributes.get("padding-right")?.toString(),
    full: attributes.get("padding")?.toString(),
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
  _parent: DividerParent,
  _options: Options,
  context: Context
): HElement[] {
  if (!context.containerWidth) {
    throw new Error(`Context must have container width`);
  }

  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const styles = {
    borderTop: ["style", "width", "color"]
      .map((attr) =>
        attributes.get(`border-${attr}` as keyof MjDividerAttributes)
      )
      .join(" "),
    fontSize: "1px",
    margin: getMargin(attributes.get("align")?.toString()),
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

  const conditional = new DownlevelHidden(MSO_OR_IE);

  return [hP, conditional.begin, hTable, conditional.end];
}
