import type { ElementContent as HContent, Node, Parent as HParent } from "hast";
import { pointStart, pointEnd } from "unist-util-position";
import { one } from "./traverse";
import { handlers as defaultHandlers } from "./handlers";
import { MjHead, MjmlNode, MjmlRoot, Parent } from "mjmlast";
import { u } from "unist-builder";
import { Context, HastNode } from "./types";
import { mediaQueries } from "./helpers/media-queries";
import { Element as HElement } from "hast";
import { select as uSelect } from "unist-util-select";
import { select as hSelect } from "hast-util-select";

export type Options = {
  allowDangerousHtml?: boolean;
  // eslint-disable-next-line no-use-before-define
  unknownHandler?: Handler;
  // eslint-disable-next-line no-use-before-define
  handlers?: Handlers;
};

export type Handler<ContextType = Context> = (
  node: MjmlNode,
  parent: Parent<any, any> | null,
  options: Options,
  context: ContextType
) => HContent | Array<HContent>;

export type Handlers = Record<string, Handler>;

export function addPosition<Right extends HContent>(
  left: MjmlNode | undefined | null,
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

function findOrBuildMjHead(tree: MjmlNode): MjHead {
  const mjHead = uSelect("mj-head", tree) as MjHead | undefined;

  return mjHead || u("mj-head", { children: [] });
}

export function toHast(tree: MjmlNode, options: Options = {}): HastNode {
  const handlers: Handlers = {
    ...defaultHandlers,
    ...(options.handlers || {}),
  };
  const mjHead = findOrBuildMjHead(tree);
  const mjmlDoc = uSelect("mjml", tree) as MjmlRoot | undefined;

  const context: Context = {
    mjHead,
    mediaQueries: {},
    defaultAttributes: {},
    cssClasses: {},
  };

  const node: HElement = one(
    tree,
    null,
    { ...options, handlers },
    context
  ) as HElement;

  const hast: HElement = Array.isArray(node)
    ? (u("root", node) as any as HElement)
    : (node as HElement);

  const mediaQueriesStyles = mediaQueries(
    context.mediaQueries,
    "480px",
    mjmlDoc?.attributes?.owa === "desktop"
  );

  const head = hSelect("head", hast) as HElement | undefined;

  if (head) {
    head.children = [...head.children, ...(mediaQueriesStyles || [])];
  }

  return hast;
}

export { handlers as defaultHandlers } from "./handlers";
