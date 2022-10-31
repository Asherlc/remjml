import find from "unist-util-find";
import type {
  Root as HRoot,
  Parent as HParent,
  ElementContent as HContent,
  Element as HElement,
} from "hast";
import { h as hastH } from "hastscript";
import { pointStart, pointEnd, PositionLike } from "unist-util-position";
import { one } from "./traverse";
import { handlers as defaultHandlers } from "./handlers";
import type { MjmlNode, Parent } from "mjmlast";

type HastNode = HRoot | HParent | HParent["children"][number];

export type Context = {
  hHead: HElement;
};

export type Handlers = Record<string, Handler>;

export type Handler = (
  node: any,
  parent?: Parent | null,
  options?: Options
) => HContent | Array<HContent> | null;

export type Options = {
  allowDangerousHtml?: boolean;
  unknownHandler?: Handler;
  handlers?: Record<string, Handler>;
};

export function addPosition<Right extends HContent>(
  left: MjmlNode | PositionLike | undefined | null,
  right: Right
): Right {
  if (left && "position" in left) {
    return {
      ...right,
      position: { start: pointStart(left), end: pointEnd(left) },
    };
  }

  return right;
}

function head(tree: MjmlNode): HElement {
  const mjHead = find(tree, "mj-head");

  return mjHead || hastH("head");
}

export function toHast(tree: MjmlNode, options: Options = {}): HastNode {
  const handlers = { ...defaultHandlers, ...(options.handlers || {}) };
  const hHead = head(tree);

  const context: Context = { hHead };

  const node = one(tree, null, { ...options, handlers }, context);

  return Array.isArray(node) ? { type: "root", children: node } : node;
}

export { handlers as defaultHandlers } from "./handlers";
