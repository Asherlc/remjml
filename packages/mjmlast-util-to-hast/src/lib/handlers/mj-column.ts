import { generateMediaQuery } from "../helpers/generate-media-query";
import widthParser from "../helpers/width-parser";
import { jsonToCss } from "../helpers/json-to-css";
import type {
  MjColumn,
  MjColumnAttributes,
  MjColumnChild,
  MjColumnChildAttributes,
  MjGroup,
  MjmlNode,
  MjSection,
  UniversalAttributes,
} from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import classNames from "classnames";
import { one } from "../traverse";
import { getBoxWidths, getShorthandAttrValue } from "../helpers/get-box-widths";

const DEFAULT_ATTRIBUTES: Pick<
  MjColumnAttributes,
  "direction" | "vertical-align"
> = {
  direction: "ltr",
  "vertical-align": "top",
};

function attributesWithDefaults(
  attributes: MjColumnAttributes & UniversalAttributes
): MjColumnAttributes & UniversalAttributes {
  return { ...DEFAULT_ATTRIBUTES, ...attributes };
}

type ColumnParent = MjGroup | MjSection;

function getMobileWidth(
  attributes: MjColumnAttributes,
  parent: ColumnParent,
  context: Context
): string | undefined {
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
    return undefined;
  }

  return `${parsedWidth / parseInt(context.containerWidth, 10)}%`;
}

function getContainerWidth(
  attributes: MjColumnAttributes,
  parent: ColumnParent,
  context: Context
): string | undefined {
  const { containerWidth: parentWidth } = context;

  if (!parentWidth) {
    return undefined;
  }

  const { borders, paddings } = getBoxWidths(attributes, parentWidth);
  const innerBorders =
    getShorthandAttrValue("inner-border", "left", attributes) +
    getShorthandAttrValue("inner-border", "right", attributes);

  const allPaddings = paddings + borders + innerBorders;

  let containerWidth =
    attributes.width || `${parseFloat(parentWidth) / parent.children.length}px`;

  const { unit, parsedWidth } = widthParser(containerWidth, {
    parseFloatToInt: false,
  });

  if (unit === "%") {
    containerWidth = `${
      (parseFloat(parentWidth) * parsedWidth) / 100 - allPaddings
    }px`;
  } else {
    containerWidth = `${parsedWidth - allPaddings}px`;
  }

  return containerWidth;
}

function column(
  node: MjColumn,
  parent: ColumnParent,
  options: Options,
  context: Context
): HElement {
  const attributes = attributesWithDefaults(node.attributes || {});
  const containerWidth = getContainerWidth(attributes, parent, context);
  const children = node.children.map((child: MjColumnChild) => {
    const childAttributes = (child.attributes || {}) as MjColumnChildAttributes;
    const hChild = one(child as MjmlNode, node, options, {
      ...context,
      containerWidth,
    });

    return h("tr", [
      h(
        "td",
        {
          align: childAttributes.align,
          "vertical-align": childAttributes["vertical-align"],
          class: childAttributes["css-class"],
          style: jsonToCss({
            background: childAttributes["container-background-color"],
            fontSize: "0px",
            padding: childAttributes.padding,
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

function hasGutter(attributes: MjColumnAttributes): boolean {
  const gutterAttributes = new Set<keyof MjColumnAttributes>([
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
  ]);

  return Array.from(gutterAttributes).some((attr) => attributes[attr] != null);
}

function tableStyles(attributes: MjColumnAttributes) {
  return {
    backgroundColor: attributes["background-color"],
    border: attributes.border,
    borderBottom: attributes["border-bottom"],
    borderLeft: attributes["border-left"],
    borderRadius: attributes["border-radius"],
    borderRight: attributes["border-right"],
    borderTop: attributes["border-top"],
    verticalAlign: attributes["vertical-align"],
  };
}

function gutter(attributes: MjColumnAttributes, hColumn: HElement): HElement {
  const style = jsonToCss({
    padding: attributes.padding,
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
  attributes: MjColumnAttributes,
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
  attributes: MjColumnAttributes,
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
  const attributes = attributesWithDefaults(node.attributes || {});
  const cssClass = attributes["css-class"];
  const classesName = classNames(
    getColumnClass(attributes, parent, context),
    "mj-outlook-group-fix",
    cssClass
      ? {
          [cssClass]: Boolean(attributes["css-class"]),
        }
      : {}
  );

  const hColumn = column(node, parent, options, context);
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
        direction: attributes.direction,
        display: "inline-block",
        verticalAlign: attributes["vertical-align"],
        width: getMobileWidth(attributes, parent, context),
      }),
    },
    columnWithGutter
  );

  return addPosition(node, wrapper);
}
