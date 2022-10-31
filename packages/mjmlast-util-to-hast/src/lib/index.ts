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
import { u } from "unist-builder";

type HastNode = HRoot | HParent | HParent["children"][number];

export type Context = {
  containerWidth?: string;
  mobileWidth?: string;
  hHead: HElement;
  mediaQueries: {
    [className: string]: string;
  };
};

export type Handlers = Record<string, Handler>;

export type Handler = (
  node: MjmlNode,
  parent: Parent | null,
  options: Options,
  context: Context
) => HContent | Array<HContent>;

export type Options = {
  allowDangerousHtml?: boolean;
  unknownHandler?: Handler;
  handlers?: Handlers;
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
  const handlers: Handlers = {
    ...defaultHandlers,
    ...(options.handlers || {}),
  };
  const hHead = head(tree);

  const context: Context = {
    hHead,
    mediaQueries: {},
  };

  const node = one(tree, null, { ...options, handlers }, context);

  if (Array.isArray(node)) {
    return u("root", node);
  }

  return node;
}

export { handlers as defaultHandlers } from "./handlers";
