// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units, { Parts } from "units-css";
import {
  beginConditionalComment,
  endConditionalComment,
} from "../helpers/conditional-comment";
import type { Node } from "unist";
import suffixCssClasses from "../helpers/suffix-css-classes";
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
import { Properties, Property } from "csstype";
import { castArray } from "lodash-es";
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

function wrapper(
  node: MjSection,
  context: Context,
  children: Node[] | Node
): HElement[] {
  const { containerWidth } = context;
  const attributes = new Attributes<MjSectionAttributes & UniversalAttributes>(
    node.attributes || {},
    context.defaultAttributes["mj-section"] || {},
    context.defaultAttributes["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const bgcolorAttr = attributes.get("background-color")
    ? { bgcolor: attributes.get("background-color") }
    : {};

  const childrenArray = castArray(children);

  const hTd = h(
    "td",
    {
      style: jsonToCss({
        lineHeight: "0px",
        fontSize: "0px",
        "mso-line-height-rule": "exactly",
      }),
    },
    [
      endConditionalComment({
        type: "downlevel-hidden",
      }) as any,
      ...childrenArray,
    ]
  );

  const cssClass = attributes.get("css-class");

  return [
    beginConditionalComment({
      expression: "mso | IE",
      type: "downlevel-hidden",
    }),
    h(
      "table",
      {
        align: "center",
        border: "0",
        cellpadding: "0",
        cellspacing: "0",
        class: cssClass ? suffixCssClasses(cssClass, "outlook") : undefined,
        role: "presentation",
        style: jsonToCss({ width: containerWidth }),
        width: containerWidth ? parseInt(containerWidth, 10) : undefined,
        ...bgcolorAttr,
      },
      [h("tr", hTd)]
    ),
  ];
}

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
    context.defaultAttributes["mj-section"] || {},
    context.defaultAttributes["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const { containerWidth } = context;
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
            ...(attributes.isFullWidth ? {} : background),
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
              [
                beginConditionalComment({
                  expression: "mso | IE",
                  type: "downlevel-hidden",
                }),
                h(
                  "table",
                  {
                    role: "presentation",
                    border: 0,
                    cellpadding: 0,
                    cellspacing: 0,
                  },
                  [
                    endConditionalComment({
                      type: "downlevel-hidden",
                    }),
                    ...children,
                    beginConditionalComment({
                      expression: "mso | IE",
                      type: "downlevel-hidden",
                    }),
                  ]
                ),
              ]
            )
          )
        )
      ),
      attributes.background.url
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
  children: Node[],
  context: Context
): HElement {
  const attributes = new Attributes<MjSectionAttributes & UniversalAttributes>(
    node.attributes || {},
    context.defaultAttributes["mj-section"] || {},
    context.defaultAttributes["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const fullWidth = isFullWidth(attributes.get("full-width"));
  const background = new Background({

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
        ...(fullWidth ? background : undefined),
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
    context.defaultAttributes["mj-section"] || {},
    context.defaultAttributes["mj-all"] || {},
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

  const wrapped = wrapper(node, context, content);

  if (fullWidth) {
    return fullWidthWrapper(node, wrapped, context);
  }

  return wrapped as HElement[];
}
