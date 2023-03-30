// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/units-css.d.ts" />
import units from "units-css";
import { ColumnWidthCssClass } from "./ColumnWidthCssClass";
import { is } from "unist-util-is";
import { generateMediaQuery } from "../../helpers/generate-media-query";
import { jsonToCss } from "../../helpers/json-to-css";
import { ColumnParent } from "./types";
import { ColumnContainerWidth } from "./ColumnContainerWidth";
import type {
  MjColumn,
  MjColumnAttributes,
  MjColumnChild,
  MjColumnChildAttributes,
  MjmlNode,
} from "mjmlast";
import { h } from "hastscript";
import { addPosition, Options } from "../..";
import { Context } from "../../types";
import { Element as HElement } from "hast";
import classNames from "classnames";
import { one } from "../../traverse";
import { defaultAttributes } from "..";
import { Attributes } from "../../helpers/Attributes";

const DEFAULT_ATTRIBUTES: Pick<
  MjColumnAttributes,
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

function column(
  node: MjColumn,
  parent: ColumnParent,
  options: Options,
  context: Context
): HElement {
  const attributes = new Attributes(
    node.attributes || {},
    context.defaultAttributes?.["mj-column"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const containerWidth = context.containerWidth
    ? new ColumnContainerWidth(context.containerWidth, parent, attributes)
    : null;

  const children = node.children.map((child: MjColumnChild) => {
    const defaultChildAttributes: MjColumnChildAttributes =
      defaultAttributes[child.type] || {};
    const childAttributes: MjColumnChildAttributes = {
      ...defaultChildAttributes,
      ...(child.attributes || {}),
    };

    const hChild = one(child as MjmlNode, node, options, {
      ...context,
      containerWidth: containerWidth?.toString(),
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

function hasGutter(attributes: Attributes<MjColumnAttributes>): boolean {
  const gutterAttributes = new Set<keyof MjColumnAttributes>([
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

function tableStyles(attributes: Attributes<MjColumnAttributes>) {
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

function gutter(
  attributes: Attributes<MjColumnAttributes>,
  hColumn: HElement
): HElement {
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
  const attributes = new Attributes(
    node.attributes || {},
    context.defaultAttributes?.["mj-column"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );
  const cssClass = attributes.get("css-class");
  const width = attributes.get("width");
  const widthCssClass = new ColumnWidthCssClass(width, parent);

  // Add className to media queries
  if (context.mediaQueries) {
    context.mediaQueries[widthCssClass.toString()] = generateMediaQuery(
      widthCssClass.width.value,
      widthCssClass.width.unit
    );
  }

  const classesName = classNames(
    widthCssClass.toString(),
    "mj-outlook-group-fix",
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
        width: getMobileWidth(width, parent, context),
      }),
    },
    columnWithGutter
  );

  return addPosition(node, wrapper);
}
