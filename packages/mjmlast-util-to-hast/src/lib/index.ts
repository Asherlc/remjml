// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../types/unist-util-find.d.ts" />
import find from "unist-util-find";
import type {
  Root as HRoot,
  Parent as HParent,
  ElementContent as HContent,
} from "hast";
import { pointStart, pointEnd, PositionLike } from "unist-util-position";
import { one } from "./traverse";
import { handlers as defaultHandlers } from "./handlers";
import type { MjHead, MjmlNode, Parent } from "mjmlast";
import { u } from "unist-builder";
import { Properties } from "csstype";

type HastNode = HRoot | HParent | HParent["children"][number];
type DefaultAttributes = Partial<
  Record<MjmlNode["type"], Record<string, string>>
>;
type CssClasses = Record<string, Properties>;

export type Context = {
  containerWidth?: string;
  mobileWidth?: string;
  mjHead: MjHead;
  mediaQueries: {
    [className: string]: string;
  };
  fullWidth?: boolean;
  defaultAttributes: DefaultAttributes;
  cssClasses: CssClasses;
};

export type Options = {
  allowDangerousHtml?: boolean;
  // eslint-disable-next-line no-use-before-define
  unknownHandler?: Handler;
  // eslint-disable-next-line no-use-before-define
  handlers?: Handlers;
};

export type Handler = (
  node: MjmlNode,
  parent: Parent<any, any> | null,
  options: Options,
  context: Context
) => HContent | Array<HContent>;

export type Handlers = Record<string, Handler>;

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

function head(tree: MjmlNode): MjHead {
  const mjHead = find<MjHead>(tree, "mj-head");

  return mjHead || u("mj-head", { children: [] });
}

export function toHast(tree: MjmlNode, options: Options = {}): HastNode {
  const handlers: Handlers = {
    ...defaultHandlers,
    ...(options.handlers || {}),
  };
  const mjHead = head(tree);

  const context: Context = {
    mjHead,
    mediaQueries: {},
    defaultAttributes: {},
    cssClasses: {},
  };

  const node = one(tree, null, { ...options, handlers }, context);

  if (Array.isArray(node)) {
    return u("root", node);
  }

  return node;
}

export { handlers as defaultHandlers } from "./handlers";
