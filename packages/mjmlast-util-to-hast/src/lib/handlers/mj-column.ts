import { generateMediaQuery } from "../helpers/generate-media-query";
import widthParser from "../helpers/width-parser";
import { jsonToCss } from "../helpers/json-to-css";
import type { MjColumn, MjGroup, MjSection } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import classNames from "classnames";

const DEFAULT_ATTRIBUTES: Pick<
  MjColumn["attributes"],
  "direction" | "vertical-align"
> = {
  direction: "ltr",
  "vertical-align": "top",
};

function attributesWithDefaults(node: MjColumn) {
  return { ...DEFAULT_ATTRIBUTES, ...node.attributes };
}

type ColumnParent = MjGroup | MjSection;

function getMobileWidth(node: MjColumn, parent: ColumnParent): string {
  const attributes = attributesWithDefaults(node);
  const containerWidth = parent?.attributes["width"];
  const siblingsLength = parent.children.length;
  const width = attributes["width"];
  const mobileWidth = attributes["mobileWidth"];

  if (mobileWidth !== "mobileWidth") {
    return "100%";
  }

  if (width === undefined) {
    return `${Math.round(100 / siblingsLength)}%`;
  }

  const { unit, parsedWidth } = widthParser(width, {
    parseFloatToInt: false,
  });

  switch (unit) {
    case "%":
      return width;
    case "px":
    default:
      return `${parsedWidth / parseInt(containerWidth, 10)}%`;
  }
}

function column(node: MjColumn): HElement {
  const children = node.children.map((child) => {
    const childAttributes = child.attributes;
    return h("tr", [
      h(
        "td",
        {
          align: childAttributes["align"],
          "vertical-align": childAttributes["vertical-align"],
          class: childAttributes["css-class"],
          style: jsonToCss({
            background: childAttributes["container-background-color"],
            fontSize: "0px",
            padding: childAttributes["padding"],
            paddingTop: childAttributes["padding-top"],
            paddingRight: childAttributes["padding-right"],
            paddingBottom: childAttributes["padding-bottom"],
            paddingLeft: childAttributes["padding-left"],
            wordBreak: "break-word",
          }),
        },
        child
      ),
    ]);
  });

  return h(
    "table",
    {
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      style: "table",
      width: "100%",
    },
    [h("tbody", children)]
  );
}

function hasGutter(node: MjColumn): boolean {
  const attributes = attributesWithDefaults(node);
  return [
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
  ].some((attr) => attributes[attr] != null);
}

function gutter(node: MjColumn, hColumn: HElement): HElement {
  const attributes = attributesWithDefaults(node);
  const style = jsonToCss({
    padding: attributes["padding"],
    paddingTop: attributes["padding-top"],
    paddingRight: attributes["padding-right"],
    paddingBottom: attributes["padding-bottom"],
    paddingLeft: attributes["padding-left"],
    backgroundColor: attributes["background-color"],
    border: attributes["border"],
    borderBottom: attributes["border-bottom"],
    borderLeft: attributes["border-left"],
    borderRadius: attributes["border-radius"],
    borderRight: attributes["border-right"],
    borderTop: attributes["border-top"],
    verticalAlign: attributes["vertical-align"],
  });

  return h(
    "table",
    {
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      width: "100%",
    },
    h("tbody", h("tr", h("td", { style }, hColumn)))
  );
}

function getParsedWidth(
  attributes,
  parent: ColumnParent
): { unit: string; parsedWidth: number } {
  const width = attributes["width"] || `${100 / parent.children.length}%`;

  const { unit, parsedWidth } = widthParser(width, {
    parseFloatToInt: false,
  });

  return {
    unit,
    parsedWidth,
  };
}

function getColumnClass(
  attributes: MjColumn["attributes"],
  parent: ColumnParent,
  context: Context
): string {
  let className = "";

  const { parsedWidth, unit } = getParsedWidth(attributes, parent);
  const formattedClassNb = parsedWidth.toString().replace(".", "-");

  switch (unit) {
    case "%":
      className = `mj-column-per-${formattedClassNb}`;
      break;

    case "px":
    default:
      className = `mj-column-px-${formattedClassNb}`;
      break;
  }

  // Add className to media queries
  context.mediaQueries[className] = generateMediaQuery(parsedWidth, unit);

  return className;
}

export function mjColumn(
  node: MjColumn,
  parent: ColumnParent,
  options: Options,
  context: Context
): HElement {
  const attributes = attributesWithDefaults(node);
  const classesName = classNames(
    getColumnClass(attributes, parent, context),
    "mj-outlook-group-fix",
    {
      [attributes["css-class"]]: Boolean(attributes["css-class"]),
    }
  );

  const hColumn = column(node);
  const columnWithGutter = hasGutter(node) ? gutter(node, hColumn) : hColumn;

  const wrapper = h(
    "div",
    {
      class: classesName,
      style: jsonToCss({
        fontSize: "0px",
        textAlign: "left",
        direction: attributes["direction"],
        display: "inline-block",
        verticalAlign: attributes["vertical-align"],
        width: getMobileWidth(node, parent),
      }),
    },
    columnWithGutter
  );

  return addPosition(node, wrapper);
}
