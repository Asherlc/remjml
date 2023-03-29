// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units, { Parts } from "units-css";
import type { Node } from "unist";
import type {
  MjBody,
  MjSection,
  MjSectionAttributes,
  MjWrapper,
  UniversalAttributes,
} from "mjmlast";
import { h } from "hastscript";
import { Context, Options } from "..";
import { Element as HElement, ElementContent } from "hast";
import { all } from "../traverse";
import { jsonToCss } from "../helpers/json-to-css";
import { Property } from "csstype";
import { BoxWidth } from "../helpers/BoxWidth";
import { Background } from "../helpers/Background";
import { Attributes } from "../helpers/Attributes";

type SectionParent = MjBody | MjWrapper;

const DEFAULT_ATTRIBUTES: Pick<
  MjSectionAttributes,
  | "background-repeat"
  | "background-size"
  | "background-position"
  | "direction"
  | "padding"
  | "text-align"
  | "text-padding"
> = {
  "background-repeat": "repeat",
  "background-size": "auto",
  "background-position": "top center",
  direction: "ltr",
  padding: "20px 0",
  "text-align": "center",
  "text-padding": "4px 4px 4px 0",
};

function isFullWidth(fullWidthAttribute: string | undefined): boolean {
  return fullWidthAttribute === "full-width";
}

function section(
  node: MjSection,
  context: Context,
  children: ElementContent[]
): HElement {
  const attributes = new Attributes<MjSectionAttributes & UniversalAttributes>(
    node.attributes || {},
    context.defaultAttributes?.["mj-section"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const { containerWidth } = context;
  const background = new Background({
    url: attributes.get("background-url"),
    size: attributes.get("background-size"),
    repeat: attributes.get("background-repeat"),
    color: attributes.get("background-color"),
    position: attributes.get("background-position"),
    positionY: attributes.get("background-position-y"),
    positionX: attributes.get("background-position-x"),
  });
  const fullWidth = isFullWidth(attributes.get("full-width"));

  return h(
    "div",
    {
      class: fullWidth ? null : attributes.get("css-class"),
      style: jsonToCss({
        ...(fullWidth ? {} : background.toStyles()),
        margin: "0px auto",
        borderRadius: attributes.get("border-radius"),
        maxWidth: containerWidth,
      }),
    },
    [
      h(
        "table",
        {
          align: "center",
          background: fullWidth ? null : attributes.get("background-url"),
          border: "0",
          cellpadding: "0",
          cellspacing: "0",
          role: "presentation",
          style: jsonToCss({
            ...(fullWidth ? {} : background.toStyles()),
            width: "100%",
            borderRadius: attributes.get("border-radius"),
          }),
        },
        h(
          "tbody",
          h(
            "tr",
            h(
              "td",
              {
                style: jsonToCss({
                  border: attributes.get("border"),
                  borderBottom: attributes.get("border-bottom"),
                  borderLeft: attributes.get("border-left"),
                  borderRight: attributes.get("border-right"),
                  borderTop: attributes.get("border-top"),
                  direction: attributes.get("direction"),
                  fontSize: "0px",
                  padding: attributes.get("padding"),
                  paddingBottom: attributes.get("padding-bottom"),
                  paddingLeft: attributes.get("padding-left"),
                  paddingRight: attributes.get("padding-right"),
                  paddingTop: attributes.get("padding-top"),
                  textAlign: attributes.get("text-align") as Property.TextAlign,
                }),
              },
              children
            )
          )
        )
      ),
      background.url
        ? h("div", {
            style: jsonToCss({
              lineHeight: "0",
              fontSize: "0",
            }),
          })
        : undefined,
    ]
  );
}

function fullWidthWrapper(
  node: MjSection,
  children: Node,
  context: Context
): HElement {
  const attributes = new Attributes<MjSectionAttributes & UniversalAttributes>(
    node.attributes || {},
    context.defaultAttributes?.["mj-section"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const fullWidth = isFullWidth(attributes.get("full-width"));
  const background = new Background({
    url: attributes.get("background-url"),
    size: attributes.get("background-size"),
    repeat: attributes.get("background-repeat"),
    color: attributes.get("background-color"),
    position: attributes.get("background-position"),
    positionY: attributes.get("background-position-y"),
    positionX: attributes.get("background-position-x"),
  });

  const tr = h("td", children as any);

  return h(
    "table",
    {
      align: "center",
      class: attributes.get("css-class"),
      background: attributes.get("background-url"),
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      style: jsonToCss({
        ...(fullWidth ? background.toStyles() : undefined),
        width: "100%",
        borderRadius: attributes.get("border-radius"),
      }),
    },
    [h("tbody", [h("tr", [tr])])]
  );
}

export function mjSection(
  node: MjSection,
  parent: SectionParent | null,
  options: Options,
  context: Context
): HElement | HElement[] {
  const attributes = new Attributes<MjSectionAttributes & UniversalAttributes>(
    node.attributes || {},
    context.defaultAttributes?.["mj-section"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const fullWidth = isFullWidth(attributes.get("full-width"));
  const containerWidth: Parts | undefined = context.containerWidth
    ? units.parse(context.containerWidth)
    : undefined;
  const boxWidths = containerWidth
    ? new BoxWidth(
        attributes.pick(
          "padding-top",
          "padding-bottom",
          "padding-left",
          "padding-right",
          "padding",
          "border-top",
          "border-bottom",
          "border-left",
          "border-right",
          "border"
        ),
        containerWidth
      )
    : undefined;

  const children = all(node, options, {
    ...context,
    fullWidth: fullWidth,
    containerWidth: boxWidths?.box?.toString(),
  });

  const content = section(node, context, children);

  if (fullWidth) {
    return fullWidthWrapper(node, content, context);
  }

  return content;
}
