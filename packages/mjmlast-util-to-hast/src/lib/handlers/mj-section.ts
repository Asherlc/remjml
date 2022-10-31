import type { Node } from "unist";
import suffixCssClasses from "../helpers/suffix-css-classes";
import type { MjBody, MjSection, MjWrapper } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { all } from "../traverse";
import { u } from "unist-builder";
import { jsonToCss } from "../helpers/json-to-css";

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

function isFullWidth(node: MjSection): boolean {
  return attributesWithDefaults(node)["full-width"] === "full-width";
}

function attributesWithDefaults(node: MjSection) {
  return { ...DEFAULT_ATTRIBUTES, ...node.attributes };
}

function hasBackground(attributes: MjSection["attributes"]): boolean {
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

function getBackgroundPosition(attributes: MjSection["attributes"]): {
  posX: XPosition;
  posY: YPosition;
} {
  const { x, y } = parseBackgroundPosition(attributes["background-position"]);

  return {
    posX: isXPosition(attributes["background-position-x"])
      ? attributes["background-position-x"]
      : x,
    posY: isYPosition(attributes["background-position-y"])
      ? attributes["background-position-y"]
      : y,
  };
}

function isPercentage(str: string) {
  return /^\d+(\.\d+)?%$/.test(str);
}

function withBackground(
  node: MjSection,
  parent: SectionParent,
  context: Context,
  children: Node[]
) {
  const attributes = attributesWithDefaults(node);
  const fullWidth = isFullWidth(node);

  let bgPosX: string;
  let bgPosY: string;

  let vSizeAttributes = {};

  ({ posX: bgPosX, posY: bgPosY } = getBackgroundPosition(attributes));

  switch (bgPosX) {
    case "left":
      bgPosX = "0%";
      break;
    case "center":
      bgPosX = "50%";
      break;
    case "right":
      bgPosX = "100%";
      break;
    default:
      if (!isPercentage(bgPosX)) {
        bgPosX = "50%";
      }
      break;
  }
  switch (bgPosY) {
    case "top":
      bgPosY = "0%";
      break;
    case "center":
      bgPosY = "50%";
      break;
    case "bottom":
      bgPosY = "100%";
      break;
    default:
      if (!isPercentage(bgPosY)) {
        bgPosY = "0%";
      }
      break;
  }

  // this logic is different when using repeat or no-repeat
  let [[vOriginX, vPosX], [vOriginY, vPosY]] = ["x", "y"].map((coordinate) => {
    const isX = coordinate === "x";
    const bgRepeat = attributes["background-repeat"] === "repeat";
    let pos: string | number = isX ? bgPosX : bgPosY;
    let origin: string | number = isX ? bgPosX : bgPosY;

    if (isPercentage(pos)) {
      // Should be percentage at this point
      const percentageValue = pos.match(/^(\d+(\.\d+)?)%$/)?.[1];

      if (!percentageValue) {
        throw new Error(`${pos} was not parseable as a percentage`);
      }

      const decimal = parseInt(percentageValue, 10) / 100;

      if (bgRepeat) {
        pos = decimal;
        origin = decimal;
      } else {
        pos = (-50 + decimal * 100) / 100;
        origin = (-50 + decimal * 100) / 100;
      }
    } else if (bgRepeat) {
      // top (y) or center (x)
      origin = isX ? "0.5" : "0";
      pos = isX ? "0.5" : "0";
    } else {
      origin = isX ? "0" : "-0.5";
      pos = isX ? "0" : "-0.5";
    }

    return [origin, pos];
  });

  // If background size is either cover or contain, we tell VML to keep the aspect
  // and fill the entire element.
  if (
    attributes["background-size"] === "cover" ||
    attributes["background-size"] === "contain"
  ) {
    vSizeAttributes = {
      size: "1,1",
      aspect: attributes["background-size"] === "cover" ? "atleast" : "atmost",
    };
  } else if (attributes["background-size"] !== "auto") {
    const bgSplit = attributes["background-size"].split(" ");

    if (bgSplit.length === 1) {
      vSizeAttributes = {
        size: attributes["background-size"],
        aspect: "atmost", // reproduces height auto
      };
    } else {
      vSizeAttributes = {
        size: bgSplit.join(","),
      };
    }
  }

  let vmlType =
    attributes["background-repeat"] === "no-repeat" ? "frame" : "tile";

  if (attributes["background-size"] === "auto") {
    vmlType = "tile"; // if no size provided, keep old behavior because outlook can't use original image size with "frame"
    [[vOriginX, vPosX], [vOriginY, vPosY]] = [
      [0.5, 0.5],
      [0, 0],
    ]; // also ensure that images are still cropped the same way
  }

  return u("root", [
    u("conditional-comment", {
      value: "mso | IE",
      commentType: "downlevel-hidden",
    }),
    u(
      "v:rect",
      {
        properties: {
          style: fullWidth
            ? `'mso-width-percent': '1000';`
            : jsonToCss({ width: context.containerWidth }),
          "xmlns:v": "urn:schemas-microsoft-com:vml",
          fill: "true",
          stroke: "false",
        },
      },
      [
        h("v:fill", {
          properties: {
            origin: `${vOriginX}, ${vOriginY}`,
            position: `${vPosX}, ${vPosY}`,
            src: attributes["background-url"],
            color: attributes["background-color"],
            type: vmlType,
            ...vSizeAttributes,
          },
        }),
        h("v:textbox", {
          properties: {
            style: "mso-fit-shape-to-text:true",
            inset: "0,0,0,0",
          },
        }),
        u("conditional-end-comment", {
          commentType: "downlevel-hidden",
        }),
        ...children,
        u("conditional-comment", {
          value: "mso | IE",
          commentType: "downlevel-hidden",
        }),
      ]
    ),
    u("conditional-end-comment", {
      commentType: "downlevel-hidden",
    }),
  ]);
}

function wrapper(
  node: MjSection,
  parent: SectionParent,
  context: Context,
  children: HElement[]
): Node[] {
  const { containerWidth } = context;
  const attributes = attributesWithDefaults(node);
  const bgcolorAttr = attributes["background-color"]
    ? { bgcolor: attributes["background-color"] }
    : {};

  return [
    u("conditional-comment", {
      value: "mso | IE",
      commentType: "downlevel-hidden",
    }),
    h(
      "table",
      {
        align: "center",
        border: "0",
        cellpadding: "0",
        cellspacing: "0",
        class: suffixCssClasses(attributes["css-class"], "outlook"),
        role: "presentation",
        style: jsonToCss({ width: containerWidth }),
        width: containerWidth ? parseInt(containerWidth, 10) : undefined,
        ...bgcolorAttr,
      },
      [
        h("tr", [
          h(
            "td",
            {
              style:
                "line-height:0px;font-size:0px;mso-line-height-rule:exactly",
            },
            [
              ...children,
              u("conditional-comment", {
                value: "mso | IE",
                commentType: "downlevel-hidden",
              }) as any as HElement,
            ]
          ),
        ]),
      ]
    ),
    u("conditional-end-comment", {
      commentType: "downlevel-hidden",
    }),
  ];
}

function getBackgroundString(attributes: MjSection["attributes"]): string {
  const { posX, posY } = getBackgroundPosition(attributes);
  return `${posX} ${posY}`;
}

function getBackground(attributes: MjSection["attributes"]): string {
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

type SectionParent = MjBody | MjWrapper;

function section(
  node: MjSection,
  parent: SectionParent,
  context: Context
): HElement {
  const attributes = attributesWithDefaults(node);
  const fullWidth = isFullWidth(node);
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
      hasBackground(attributes)
        ? h("div", {
            style: jsonToCss({
              lineHeight: "0",
              fontSize: "0",
            }),
          })
        : undefined,
      h("table", {
        align: "center",
        background: isFullWidth(node) ? null : attributes["background-url"],
        border: "0",
        cellpadding: "0",
        cellspacing: "0",
        role: "presentation",
        style: jsonToCss({
          ...(fullWidth ? {} : background),
          width: "100%",
          borderRadius: attributes["border-radius"],
        }),
      }),
    ]
  );
}

function fullWidth(
  node: MjSection,
  parent: SectionParent,
  context: Context
): HElement {
  const attributes = attributesWithDefaults(node);
  const hSection = section(node, parent, context);
  const withWrapper = wrapper(node, parent, context, [hSection]);
  const fullWidth = isFullWidth(node);
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

  const content = hasBackground(attributes)
    ? withBackground(node, parent, context, withWrapper)
    : hSection;

  const tr = h("td", content as any as HElement);

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
  parent: SectionParent,
  options: Options,
  context: Context
): HElement {
  const attributes = attributesWithDefaults(node);

  const children = all(node, options, context);

  const hBody = h(
    "div",
    {
      class: attributes["css-class"],
      style: jsonToCss({ backgroundColor: attributes["background-color"] }),
    },
    children
  );

  return addPosition(node, hBody);
}
