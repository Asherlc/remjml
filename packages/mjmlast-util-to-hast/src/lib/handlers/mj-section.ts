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
import { Property } from "csstype";
import { castArray } from "lodash-es";
import { BoxWidth } from "../helpers/BoxWidth";
import { Width } from "../helpers/Width";
import { Background } from "../helpers/Background";

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
  const attributes = new SectionAttributes(node.attributes || {});
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

class SectionAttributes {
  #attributes: MjSectionAttributes & UniversalAttributes;

  constructor(attributes: MjSectionAttributes & UniversalAttributes) {
    this.#attributes = attributes;
  }

  get withDefaults(): MjSectionAttributes & UniversalAttributes {
    return { ...DEFAULT_ATTRIBUTES, ...this.#attributes };
  }

  get isFullWidth(): boolean {
    return this.withDefaults["full-width"] === "full-width";
  }

  get(attributeKey: string): string {
    return this.withDefaults[attributeKey];
  }

  get background(): Background {
    return new Background({
      url: this.withDefaults["background-url"],
      size: this.withDefaults["background-size"],
      repeat: this.withDefaults["background-repeat"],
      color: this.withDefaults["background-color"],
      position: this.withDefaults["background-position"],
      positionY: this.withDefaults["background-position-y"],
      positionX: this.withDefaults["background-position-x"],
    });
  }
}

function section(
  node: MjSection,
  context: Context,
  children: ElementContent[]
): HElement {
  const attributes = new SectionAttributes(node.attributes || {});
  const { containerWidth } = context;
  const background = attributes.background.url
    ? {
        background: attributes.background.toCssPropertyValue(),
        // background size, repeat and position has to be separate since yahoo does not support shorthand background css property
        "background-position": attributes.background,
        "background-repeat": attributes.background.repeat,
        "background-size": attributes.background.size,
      }
    : {
        background: attributes.background.color,
        "background-color": attributes.background.color,
      };

  return h(
    "div",
    {
      class: attributes.isFullWidth ? null : attributes.get("css-class"),
      style: jsonToCss({
        ...(attributes.isFullWidth ? {} : background),
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
          background: attributes.isFullWidth
            ? null
            : attributes.get("background-url"),
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

function fullWidth(node: MjSection, children: Node[]): HElement {
  const attributes = attributesWithDefaults(node.attributes || {});
  const fullWidth = isFullWidth(attributes);
  const background = attributes["background-url"]
    ? {
        background: getBackground(attributes),
        // background size, repeat and position has to be seperate since yahoo does not support shorthand background css property
        "background-position": getBackgroundString(attributes),
        "background-repeat": attributes["background-repeat"],
        "background-size": attributes["background-size"],
      }
    : {
        background: attributes["background-color"],
        "background-color": attributes["background-color"],
      };

  const tr = h("td", children as any);

  return h(
    "table",
    {
      align: "center",
      class: attributes["css-class"],
      background: attributes["background-url"],
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      style: jsonToCss({
        ...(fullWidth ? background : undefined),
        width: "100%",
        borderRadius: attributes["border-radius"],
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
  const attributes = new SectionAttributes(node.attributes || {});
  const containerWidth: Width | undefined = context.containerWidth
    ? new Width(context.containerWidth)
    : undefined;
  const boxWidths = containerWidth
    ? new BoxWidth(attributes.withDefaults, containerWidth)
    : undefined;

  const children = all(node, options, {
    ...context,
    fullWidth: attributes.isFullWidth,
    containerWidth: boxWidths?.box?.toString(),
  });

  const content = section(node, context, children);

  const wrapped = wrapper(node, context, content);

  if (attributes.isFullWidth) {
    return fullWidth(node, wrapped);
  }

  return wrapped as HElement[];
}
