import { generateMediaQuery } from "../helpers/generate-media-query";
import widthParser from "../helpers/width-parser";
import { jsonToCss } from "../helpers/json-to-css";
import type {
  MjColumn,
  MjColumnChild,
  MjGroup,
  MjmlNode,
  MjSection,
} from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import * as classNames from "classnames";
import { all, one } from "../traverse";

const DEFAULT_ATTRIBUTES: Pick<
  MjColumn["attributes"],
  "direction" | "vertical-align"
> = {
  direction: "ltr",
  "vertical-align": "top",
};

function attributesWithDefaults(attributes: MjColumn["attributes"]) {
  return { ...DEFAULT_ATTRIBUTES, ...attributes };
}

type ColumnParent = MjGroup | MjSection;

function getMobileWidth(
  attributes: MjColumn["attributes"],
  parent: ColumnParent,
  context: Context
): string {
  const siblingsLength = parent.children.length;
  const { width } = attributes;
  const mobileWidth = context.mobileWidth;

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
  }

  if (!context.containerWidth) {
    throw new Error(`No containerWidth`);
  }

  return `${parsedWidth / parseInt(context.containerWidth, 10)}%`;
}

function column(node: MjColumn, options: Options, context: Context): HElement {
  const attributes = attributesWithDefaults(node.attributes);
  const children = node.children.map((child: MjColumnChild) => {
    const childAttributes = child.attributes;
    const hChild = one(child as MjmlNode, node, options, context);

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
        hChild
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
      style: jsonToCss(tableStyles(attributes)),
      width: "100%",
    },
    [h("tbody", children)]
  );
}

function hasGutter(attributes: MjColumn["attributes"]): boolean {
  const gutterAttributes = new Set<keyof MjColumn["attributes"]>([
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
  ]);

  return Array.from(gutterAttributes).some((attr) => attributes[attr] != null);
}

function tableStyles(attributes: MjColumn["attributes"]) {
  return {
    backgroundColor: attributes["background-color"],
    border: attributes["border"],
    borderBottom: attributes["border-bottom"],
    borderLeft: attributes["border-left"],
    borderRadius: attributes["border-radius"],
    borderRight: attributes["border-right"],
    borderTop: attributes["border-top"],
    verticalAlign: attributes["vertical-align"],
  };
}

function gutter(
  attributes: MjColumn["attributes"],
  hColumn: HElement
): HElement {
  const style = jsonToCss({
    padding: attributes["padding"],
    paddingTop: attributes["padding-top"],
    paddingRight: attributes["padding-right"],
    paddingBottom: attributes["padding-bottom"],
    paddingLeft: attributes["padding-left"],
    ...tableStyles(attributes),
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
  attributes: MjColumn["attributes"],
  parent: ColumnParent
): { unit: string; parsedWidth: number } {
  const width = attributes.width || `${100 / parent.children.length}%`;

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
  const attributes = attributesWithDefaults(node.attributes);
  const classesName = classNames(
    getColumnClass(attributes, parent, context),
    "mj-outlook-group-fix",
    {
      [attributes["css-class"]]: Boolean(attributes["css-class"]),
    }
  );

  const hColumn = column(node, options, context);
  const columnWithGutter = hasGutter(attributes)
    ? gutter(attributes, hColumn)
    : hColumn;

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
        width: getMobileWidth(attributes, parent, context),
      }),
    },
    columnWithGutter
  );

  return addPosition(node, wrapper);
}
