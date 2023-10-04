// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/units-css.d.ts" />
import units from "units-css";
import { ColumnWidthCssClass } from "./ColumnWidthCssClass";
import { is } from "unist-util-is";
import { generateMediaQuery } from "../../helpers/generate-media-query";
import { jsonToCss } from "../../helpers/json-to-css";
import type { ColumnParent } from "./types";
import { ColumnContainerWidth } from "./ColumnContainerWidth";
import type { MjColumn, MjColumnChild } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "../..";
import { addPosition } from "../../addPosition";
import type { Context } from "../../types";
import type { Element as HElement } from "hast";
import classNames from "classnames";
import { one } from "../../traverse";
import { getDefaultAttributes } from "../getDefaultAttributes";
import { Attributes } from "../../helpers/attributes/Attributes";
import { MJ_OUTLOOK_GROUP_FIX_CLASSNAME } from "../../helpers/head";

const DEFAULT_ATTRIBUTES: Pick<
  MjColumn["attributes"],
  "direction" | "vertical-align"
> = {
  direction: "ltr",
  "vertical-align": "top",
};

function getMobileWidth(
  widthString: string | undefined,
  parent: ColumnParent,
  context: Context
): string | undefined {
  const nonRawSiblings = parent.children.filter(
    (sibling) => !is(sibling, "raw")
  );
  const mobileWidth = context.mobileWidth;

  if (mobileWidth !== "mobileWidth") {
    return "100%";
  }

  if (widthString === undefined) {
    return `${Math.round(100 / nonRawSiblings.length)}%`;
  }

  const { unit, value: parsedWidth } = units.parse(widthString);

  if (unit === "%") {
    return widthString;
  }

  if (!context.containerWidth) {
    return undefined;
  }

  return `${parsedWidth / parseInt(context.containerWidth, 10)}%`;
}

type MjColumnChildTdWrapperAttributes = Partial<{
  "container-background-color": string;
  align: "left" | "right" | "center" | "justify";
  "vertical-align": "top" | "middle" | "bottom";
  "css-class": string;
  background: string;
  padding: string;
  "padding-top": string;
  "padding-right": string;
  "padding-bottom": string;
  "padding-left": string;
}>;

function column(
  node: MjColumn,
  parent: ColumnParent,
  options: Options,
  context: Context
): HElement {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const containerWidth = context.containerWidth
    ? new ColumnContainerWidth(context.containerWidth, parent, attributes)
    : null;

  const children = node.children.map((child: MjColumnChild) => {
    const defaultChildAttributes: MjColumnChildTdWrapperAttributes =
      getDefaultAttributes(child.type);
    const childTdWrapperAttributes: Attributes = new Attributes({
      defaultAttributes: defaultChildAttributes,
      attributes: child.attributes || {},
      mjClassesAttributes: {},
      mjClass: undefined,
    });

    const hChild = one(child, node, options, {
      ...context,
      containerWidth: containerWidth?.toString(),
    });

    return h("tr", [
      h(
        "td",
        {
          align: childTdWrapperAttributes.get("align"),
          "vertical-align": childTdWrapperAttributes.get("vertical-align"),
          class: childTdWrapperAttributes.get("css-class"),
          style: jsonToCss({
            background: childTdWrapperAttributes.get(
              "container-background-color"
            ),
            fontSize: "0px",
            padding: childTdWrapperAttributes.get("padding"),
            paddingTop: childTdWrapperAttributes.get("padding-top"),
            paddingRight: childTdWrapperAttributes.get("padding-right"),
            paddingBottom: childTdWrapperAttributes.get("padding-bottom"),
            paddingLeft: childTdWrapperAttributes.get("padding-left"),
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

function hasGutter(attributes: Attributes): boolean {
  const gutterAttributes = new Set<keyof MjColumn["attributes"]>([
    "padding",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "padding-top",
  ]);

  return Array.from(gutterAttributes).some(
    (attr) => attributes.get(attr) != null
  );
}

function tableStyles(attributes: Attributes) {
  return {
    backgroundColor: attributes.get("background-color"),
    border: attributes.get("border"),
    borderBottom: attributes.get("border-bottom"),
    borderLeft: attributes.get("border-left"),
    borderRadius: attributes.get("border-radius"),
    borderRight: attributes.get("border-right"),
    borderTop: attributes.get("border-top"),
    verticalAlign: attributes.get("vertical-align"),
  };
}

function gutter(attributes: Attributes, hColumn: HElement): HElement {
  const style = jsonToCss({
    padding: attributes.get("padding"),
    paddingTop: attributes.get("padding-top"),
    paddingRight: attributes.get("padding-right"),
    paddingBottom: attributes.get("padding-bottom"),
    paddingLeft: attributes.get("padding-left"),
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

export function mjColumn(
  node: MjColumn,
  parent: ColumnParent,
  options: Options,
  context: Context
): HElement {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClasses,
  });
  const cssClass = attributes.get("css-class");
  const width = attributes.get("width");
  const widthCssClass = new ColumnWidthCssClass(width?.toString(), parent);

  // Add className to media queries
  if (context.mediaQueries) {
    context.mediaQueries[widthCssClass.toString()] = generateMediaQuery(
      widthCssClass.width.value,
      widthCssClass.width.unit
    );
  }

  const classesName = classNames(
    widthCssClass.toString(),
    MJ_OUTLOOK_GROUP_FIX_CLASSNAME,
    cssClass
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
        direction: attributes.get("direction"),
        display: "inline-block",
        verticalAlign: attributes.get("vertical-align"),
        width: getMobileWidth(width?.toString(), parent, context),
      }),
    },
    columnWithGutter
  );

  return addPosition(node, wrapper);
}
