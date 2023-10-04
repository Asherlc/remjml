// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import units from "units-css";
import type {
  MjBody,
  MjGroup,
  MjGroupAttributes,
  MjWrapper,
  UniversalAttributes,
} from "mjmlast";
import { h } from "hastscript";
import type { Options } from "../..";
import type { Context } from "../../types";
import type { Element as HElement, RootContent } from "hast";
import { all } from "../../traverse";
import { Attributes } from "../../helpers/Attributes";
import classNames from "classnames";
import { MJ_OUTLOOK_GROUP_FIX_CLASSNAME } from "../../helpers/head";

type GroupParent = MjBody | MjWrapper;

const DEFAULT_ATTRIBUTES: Pick<MjGroupAttributes, "direction"> = {
  direction: "ltr",
};

function group(
  node: MjGroup,
  context: Context,
  children: RootContent[]
): HElement {
  const attributes = new Attributes<MjGroupAttributes & UniversalAttributes>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES
  );
  const { containerWidth } = context;

  return h("div", {
    class: classNames(MJ_OUTLOOK_GROUP_FIX_CLASSNAME),
  });
}

export function mjGroup(
  node: MjGroup,
  parent: GroupParent | null,
  options: Options,
  context: Context
): HElement | HElement[] {
  const attributes = new Attributes<MjGroupAttributes & UniversalAttributes>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES
  );
  const containerWidth: Parts | undefined = context.containerWidth
    ? units.parse(context.containerWidth)
    : undefined;

  const children = all(node, options, {
    ...context,
    containerWidth: boxWidths?.box?.toString(),
  });

  const content = group(node, context, children);

  return content;
}
