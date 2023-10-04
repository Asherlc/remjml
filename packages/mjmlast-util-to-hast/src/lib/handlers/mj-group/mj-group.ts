import { isMjRaw, isMjColumn } from "mjmlast";
import type {
  MjColumn,
  MjBody,
  MjGroup,
  MjGroupAttributes,
  MjGroupChild,
  MjWrapper,
} from "mjmlast";
import { h } from "hastscript";
import type { Options } from "../..";
import type { Context } from "../../types";
import type { Element as HElement, RootContent as HRootContent } from "hast";
import { one } from "../../traverse";
import { Attributes } from "../../helpers/Attributes";
import classNames from "classnames";
import { MJ_OUTLOOK_GROUP_FIX_CLASSNAME } from "../../helpers/head";
import { ColumnWidthCssClass } from "../mj-column/ColumnWidthCssClass";
import { jsonToCss } from "../../helpers/json-to-css";
import { getDefaultAttributes } from "../getDefaultAttributes";

type GroupParent = MjBody | MjWrapper;

const DEFAULT_ATTRIBUTES: Pick<MjGroupAttributes, "direction"> = {
  direction: "ltr",
};

export function mjGroup(
  node: MjGroup,
  parent: GroupParent,
  options: Options,
  context: Context
): HElement | HElement[] {
  const attributes = new Attributes<MjGroup["attributes"]>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES
  );
  const width = attributes.get("width");
  const widthCssClass = new ColumnWidthCssClass(width, parent);

  const children: HRootContent[] = node.children.flatMap(
    (child: MjGroupChild): HRootContent | HRootContent[] => {
      if (isMjRaw(child)) {
        return one(child, node, options, context);
      }

      if (!isMjColumn(child)) {
        throw new Error(`mj-group can only accept raw or columns as children`);
      }

      const defaultChildAttributes = getDefaultAttributes(child.type);
      const childAttributes: MjColumn["attributes"] = {
        ...defaultChildAttributes,
        ...(child.attributes || {}, { mobileWidth: "100%" }),
      };
      const childWithAttributes: MjColumn = {
        ...child,
        attributes: childAttributes,
      };

      const hChild: HRootContent | HRootContent[] = one(
        childWithAttributes,
        node,
        options,
        context
      );

      return hChild;
    }
  );

  return h(
    "div",
    {
      class: classNames(
        MJ_OUTLOOK_GROUP_FIX_CLASSNAME,
        widthCssClass.toString(),
        attributes.get("css-class")
      ),
      style: jsonToCss({
        fontSize: "0",
        lineHeight: "0",
        textAlign: "left",
        display: "inline-block",
        width: "100%",
        direction: attributes.get("direction"),
        verticalAlign: attributes.get("vertical-align"),
        backgroundColor: attributes.get("background-color"),
      }),
    },
    children
  );
}
