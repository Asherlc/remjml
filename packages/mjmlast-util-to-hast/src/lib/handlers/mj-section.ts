// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import units from "units-css";
import type { MjBody, MjSection, MjWrapper } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Context } from "../types";
import type { Element as HElement, RootContent } from "hast";
import { all } from "../traverse";
import { jsonToCss } from "../helpers/json-to-css";
import type { Property } from "csstype";
import { BoxWidth } from "../helpers/BoxWidth";
import { Background } from "../helpers/Background";
import { Attributes } from "../helpers/Attributes";

type SectionParent = MjBody | MjWrapper;

const DEFAULT_ATTRIBUTES: Pick<
  MjSection["attributes"],
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
  children: RootContent[]
): HElement {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const { containerWidth } = context;
  const background = new Background({
    url: attributes.get("background-url")?.toString(),
    size: attributes.get("background-size")?.toString(),
    repeat: attributes.get("background-repeat")?.toString(),
    color: attributes.get("background-color")?.toString(),
    position: attributes.get("background-position")?.toString(),
    positionY: attributes.get("background-position-y")?.toString(),
    positionX: attributes.get("background-position-x")?.toString(),
  });
  const fullWidth = isFullWidth(attributes.get("full-width")?.toString());

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
  context: Context,
  children: HElement[]
): HElement {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const fullWidth = isFullWidth(attributes.get("full-width")?.toString());
  const background = new Background({
    url: attributes.get("background-url")?.toString(),
    size: attributes.get("background-size")?.toString(),
    repeat: attributes.get("background-repeat")?.toString(),
    color: attributes.get("background-color")?.toString(),
    position: attributes.get("background-position")?.toString(),
    positionY: attributes.get("background-position-y")?.toString(),
    positionX: attributes.get("background-position-x")?.toString(),
  });

  const tr = h("td", children);

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
  _parent: SectionParent | null,
  options: Options,
  context: Context
): HElement | HElement[] {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const fullWidth = isFullWidth(attributes.get("full-width")?.toString());
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
    fullWidth,
    containerWidth: boxWidths?.box?.toString(),
  });

  const content = section(node, context, children);

  if (fullWidth) {
    return fullWidthWrapper(node, context, [content]);
  }

  return content;
}
