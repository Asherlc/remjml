import {
  conditionalComment,
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
import { u } from "unist-builder";
import { jsonToCss } from "../helpers/json-to-css";
import { Property } from "csstype";
import { castArray } from "lodash-es";
import { getBoxWidths } from "../helpers/get-box-widths";

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

function isFullWidth(attributes: MjSectionAttributes): boolean {
  return attributes["full-width"] === "full-width";
}

function attributesWithDefaults(
  attributes: MjSectionAttributes & UniversalAttributes
): MjSectionAttributes & UniversalAttributes {
  return { ...DEFAULT_ATTRIBUTES, ...attributes };
}

function hasBackground(attributes: MjSectionAttributes): boolean {
  return attributes["background-url"] != null;
}

type YPosition = "top" | "bottom" | "center";
type XPosition = "left" | "right" | "center";

function isYPosition(value: string): value is YPosition {
  return ["center", "top", "bottom"].includes(value);
}

function isXPosition(value: string): value is XPosition {
  return ["center", "top", "bottom"].includes(value);
}

function parseBackgroundPosition(backgroundPosition: string): {
  x: XPosition;
  y: YPosition;
} {
  const posSplit = backgroundPosition.split(" ");

  if (posSplit.length === 1) {
    const val = posSplit[0];
    // here we must determine if x or y was provided ; other will be center
    if (isYPosition(val) && ["top", "bottom"].includes(val)) {
      return {
        x: "center",
        y: val,
      };
    } else if (isXPosition(val)) {
      return {
        x: val,
        y: "center",
      };
    }
  }

  if (posSplit.length === 2) {
    // x and y can be put in any order in background-position so we need to determine that based on values
    const val1 = posSplit[0];
    const val2 = posSplit[1];

    if (
      isYPosition(val1) &&
      isXPosition(val2) &&
      (["top", "bottom"].includes(val1) ||
        (val1 === "center" && ["left", "right"].includes(val2)))
    ) {
      return {
        x: val2,
        y: val1,
      };
    } else if (isXPosition(val1) && isYPosition(val2)) {
      return {
        x: val1,
        y: val2,
      };
    }
  }

  // more than 2 values is not supported, let's treat as default value
  return { x: "center", y: "top" };
}

function getBackgroundPosition(attributes: MjSectionAttributes): {
  posX: XPosition;
  posY: YPosition;
} {
  const backgroundPosition = attributes["background-position"];
  const backgroundPositionX = attributes["background-position-x"];
  const backgroundPositionY = attributes["background-position-y"];

  if (
    backgroundPositionX &&
    backgroundPositionY &&
    isXPosition(backgroundPositionX) &&
    isYPosition(backgroundPositionY)
  ) {
    return { posX: backgroundPositionX, posY: backgroundPositionY };
  }

  if (backgroundPosition) {
    const { x, y } = parseBackgroundPosition(backgroundPosition);

    return { posX: x, posY: y };
  }

  throw new Error(`No background position`);
}

function wrapper(
  node: MjSection,
  context: Context,
  children: Node[] | Node
): Node[] {
  const { containerWidth } = context;
  const attributes = attributesWithDefaults(node.attributes || {});
  const bgcolorAttr = attributes["background-color"]
    ? { bgcolor: attributes["background-color"] }
    : {};

  const childrenArray = castArray(children);

  const td = u(
    "element",
    {
      tagName: "td",
      properties: {
        style: "line-height:0px;font-size:0px;mso-line-height-rule:exactly",
      },
    },
    [
      ...childrenArray,
      beginConditionalComment({
        expression: "mso | IE",
        type: "downlevel-hidden",
      }),
    ]
  ) as unknown as HElement;

  const cssClass = attributes["css-class"];

  return conditionalComment(
    {
      expression: "mso | IE",
      type: "downlevel-hidden",
    },
    [
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
        [h("tr", td)]
      ),
    ]
  );
}

function getBackgroundString(attributes: MjSectionAttributes): string {
  const { posX, posY } = getBackgroundPosition(attributes);
  return `${posX} ${posY}`;
}

function getBackground(attributes: MjSectionAttributes): string {
  return [
    attributes["background-color"],
    ...(hasBackground(attributes)
      ? [
          `url('${attributes["background-url"]}')`,
          getBackgroundString(attributes),
          `/ ${attributes["background-size"]}`,
          attributes["background-repeat"],
        ]
      : []
    ).join(" "),
  ].join(" ");
}

function section(
  node: MjSection,
  context: Context,
  children: ElementContent[]
): HElement {
  const attributes = attributesWithDefaults(node.attributes || {});
  const fullWidth = isFullWidth(attributes);
  const { containerWidth } = context;
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

  return h(
    "div",
    {
      class: fullWidth ? null : attributes["css-class"],
      style: jsonToCss({
        ...(fullWidth ? {} : background),
        margin: "0px auto",
        borderRadius: attributes["border-radius"],
        maxWidth: containerWidth,
      }),
    },
    [
      h(
        "table",
        {
          align: "center",
          background: isFullWidth(attributes)
            ? null
            : attributes["background-url"],
          border: "0",
          cellpadding: "0",
          cellspacing: "0",
          role: "presentation",
          style: jsonToCss({
            ...(fullWidth ? {} : background),
            width: "100%",
            borderRadius: attributes["border-radius"],
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
                  border: attributes.border,
                  borderBottom: attributes["border-bottom"],
                  borderLeft: attributes["border-left"],
                  borderRight: attributes["border-right"],
                  borderTop: attributes["border-top"],
                  direction: attributes.direction,
                  fontSize: "0px",
                  padding: attributes.padding,
                  paddingBottom: attributes["padding-bottom"],
                  paddingLeft: attributes["padding-left"],
                  paddingRight: attributes["padding-right"],
                  paddingTop: attributes["padding-top"],
                  textAlign: attributes["text-align"] as Property.TextAlign,
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
      hasBackground(attributes)
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
  const attributes = attributesWithDefaults(node.attributes || {});

  const { box } = context.containerWidth
    ? getBoxWidths(attributes, context.containerWidth)
    : { box: undefined };
  const containerWidth = `${box}px`;

  const children = all(node, options, {
    ...context,
    containerWidth,
  });

  const content = section(node, context, children);

  const wrapped = wrapper(node, context, content);

  const full: HElement | HElement[] = isFullWidth(attributes)
    ? fullWidth(node, wrapped)
    : (wrapped as HElement[]);

  return full;
}
