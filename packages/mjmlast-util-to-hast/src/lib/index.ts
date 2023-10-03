import type {
  ElementContent as HContent,
  Element as HElement,
  Root as HRoot,
} from "hast";
import { remove } from "unist-util-remove";
import { pointStart, pointEnd } from "unist-util-position";
import { one } from "./traverse";
import { handlers as defaultHandlers } from "./handlers";
import type {
  MjAttributes,
  MjBody,
  MjHead,
  MjStyle,
  MjmlNode,
  MjmlRoot,
} from "mjmlast";
import { u } from "unist-builder";
import type { Context, HastNode } from "./types";
import { mediaQueries } from "./helpers/media-queries";
import { select as uSelect, selectAll as uSelectAll } from "unist-util-select";
import { select as hSelect } from "hast-util-select";
import { applyInlineStyles, removeInlineStyles } from "./helpers/inline-styles";
import { toString } from "mjmlast-util-to-string";
import { h } from "hastscript";
import { applyGlobalAttributes } from "./helpers/global-attributes";
import type { Handler } from "./Handler";

export type Handlers = Record<string, Handler>;

export type Options = {
  allowDangerousHtml?: boolean;
  // eslint-disable-next-
  unknownHandler?: Handler;
  handlers?: Handlers;
};

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

export function removeGlobalStyles(tree: MjmlNode): string {
  const mjStyleElements = (uSelectAll("mj-style", tree) as MjStyle[]).filter(
    (node: MjStyle) => {
      if (!node.attributes?.inline) {
        remove(tree, node);
        return true;
      }

      return false;
    }
  );
  const stylesheets = mjStyleElements.map(toString).join("\n");

  return stylesheets;
}

export function toHast(
  tree: MjmlNode,
  options: Options | null | undefined = {}
): HastNode {
  const handlers: Handlers = {
    ...defaultHandlers,
    ...(options?.handlers || {}),
  };
  const inlineStyles = removeInlineStyles(tree);
  const globalStyles = removeGlobalStyles(tree);
  const mjHead = findOrBuildMjHead(tree);
  const mjmlDoc = uSelect("mjml", tree) as MjmlRoot | undefined;
  const mjAttributes = uSelect("mj-attributes", tree) as
    | MjAttributes
    | undefined;
  const mjBody = uSelect("mj-body", tree) as MjBody | undefined;

  if (mjAttributes && mjBody) {
    applyGlobalAttributes(mjAttributes, mjBody);
    remove(tree, "mj-attributes");
  }

  const context: Context = {
    mjHead,
    navbarBaseUrl: undefined,
    mediaQueries: {},
  };

  const node = one(tree, null, { ...options, handlers }, context) as HElement[];

  const hast: HRoot = u("root", node);

  const mediaQueriesStyles = mediaQueries(
    context.mediaQueries,
    "480px",
    mjmlDoc?.attributes?.owa === "desktop"
  );

  const head = hSelect("head", hast) as HElement | undefined;

  if (head) {
    head.children = [
      ...head.children,
      ...(mediaQueriesStyles || []),
      h("style", { type: "text/css" }, globalStyles),
    ];
  }

  applyInlineStyles(hast, inlineStyles);

  return hast;
}

export { handlers as defaultHandlers } from "./handlers";
