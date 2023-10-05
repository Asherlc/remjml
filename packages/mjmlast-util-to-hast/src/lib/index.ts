import type { Element as HElement, Root as HRoot } from "hast";
import { remove } from "unist-util-remove";
import { one } from "./traverse";
import { defaultHandlers } from "./handlers/defaultHandlers";
import type {
  BaseAttributes,
  MjAll,
  MjAttributes,
  MjBody,
  MjClass,
  MjHead,
  MjStyle,
  MjmlNode,
  MjmlRoot,
} from "mjmlast";
import { u } from "unist-builder";
import type { Context, HastNode, MjClassesAttributes } from "./types";
import { mediaQueries } from "./helpers/media-queries";
import { select as uSelect, selectAll as uSelectAll } from "unist-util-select";
import { select as hSelect } from "hast-util-select";
import { applyInlineStyles } from "./helpers/inline-styles/applyInlineStyles";
import { removeInlineStyles } from "./helpers/inline-styles/removeInlineStyles";
import { toString } from "mjmlast-util-to-string";
import { h } from "hastscript";
import { applyGlobalAttributes } from "./helpers/global-attributes";
import type { Handler } from "./Handler";
import type { Handlers } from "./Handlers";

export type Options = {
  allowDangerousHtml?: boolean;
  // eslint-disable-next-
  unknownHandler?: Handler;
  handlers?: Handlers;
};

function findOrBuildMjHead(tree: MjmlNode): MjHead {
  const mjHead = uSelect("mj-head", tree) as MjHead | undefined;

  return mjHead || u("mj-head", { children: [] });
}

function removeGlobalStyles(tree: MjmlNode): string {
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
  const mjClasses = uSelectAll("mj-class", tree) as MjClass[];
  const mjAlls = uSelectAll("mj-all", tree) as MjAll[];
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
    mjClassesAttributes: mjClasses.reduce(
      (
        accumulator: MjClassesAttributes,
        mjClass: MjClass
      ): MjClassesAttributes => {
        const { name, ...attributes } = mjClass.attributes;

        return {
          ...accumulator,
          [name]: attributes,
        };
      },
      {}
    ),
    mjAllAttributes: mjAlls.reduce(
      (accumulator: BaseAttributes, mjAll: MjAll) => {
        return {
          ...accumulator,
          ...mjAll.attributes,
        };
      },
      {}
    ),
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
