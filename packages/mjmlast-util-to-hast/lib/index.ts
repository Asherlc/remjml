import type { Element, Properties, Content } from "hast";
import { pointStart, pointEnd, PositionLike } from "unist-util-position";
import { generated } from "unist-util-generated";
import { one } from "./traverse";
import { handlers } from "./handlers";
import type { MjmlAstNode } from "mjmlast";

const own = {}.hasOwnProperty;

type Data = Record<string, unknown> & EmbeddedHastFields;

type NodeWithData = MjmlAstNode & { data?: Data };

type HFunctionProps = (
  node: MjmlAstNode | PositionLike | null | undefined,
  tagName: string,
  props: Properties,
  children?: [Content]
) => Element;

type HFunctionNoProps = (
  node: MjmlAstNode | PositionLike | null | undefined,
  tagName: string,
  children?: [Content]
) => Element;

type Handlers = Record<string, Handler>;

type HFields = {
  dangerous: boolean;
  definition: (identifier: string) => Definition | null;
  handlers: Handlers;
  augment: (
    left: NodeWithData | PositionLike | null | undefined,
    right: Content
  ) => Content;
};

export type H = HFunctionProps & HFunctionNoProps & HFields;

export type Handler = (
  h: H,
  node: any,
  parent: Parent | null
) => Content | Array<Content> | null | undefined;

type Options = {
  allowDangerousHtml?: boolean;
  unknownHandler?: Handler;
  handlers?: Record<string, Handler>;
  passThrough?: string;
};

type EmbeddedHastFields = {
  hName: string;
  hProperties: Properties;
  hChildren: [Content];
};

function factory(tree: MjmlAstNode, options: Options) {
  const settings = options || {};
  const dangerous = settings.allowDangerousHtml || false;

  h.dangerous = dangerous;
  h.definition = definitions(tree);
  h.augment = augment;
  h.handlers = { ...handlers, ...settings.handlers };
  h.unknownHandler = settings.unknownHandler;
  h.passThrough = settings.passThrough;

  return h;

  /**
   * Finalise the created `right`, a hast node, from `left`, an mdast node.
   *
   * @param {(NodeWithData|PositionLike)?} left
   * @param {Content} right
   * @returns {Content}
   */
  function augment(left, right) {
    // Handle `data.hName`, `data.hProperties, `data.hChildren`.
    if (left && "data" in left && left.data) {
      /** @type {Data} */
      const data: Data = left.data;

      if (data.hName) {
        if (right.type !== "element") {
          right = {
            type: "element",
            tagName: "",
            properties: {},
            children: [],
          };
        }

        right.tagName = data.hName;
      }

      if (right.type === "element" && data.hProperties) {
        right.properties = { ...right.properties, ...data.hProperties };
      }

      if ("children" in right && right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }

    if (left) {
      const ctx = "type" in left ? left : { position: left };

      if (!generated(ctx)) {
        right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }

    return right;
  }

  /**
   * Create an element for `node`.
   *
   * @type {HFunctionProps}
   */
  function h(node, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = {};
    }

    return augment(node, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || [],
    });
  }
}

/**
 * Transform `tree` (an mdast node) to a hast node.
 *
 * @param {MdastNode} tree mdast node
 * @param {Options} [options] Configuration
 * @returns {HastNode|null|undefined} hast node
 */
export function toHast(tree, options) {
  const h = factory(tree, options);
  const node = one(h, tree, null);

  return Array.isArray(node) ? { type: "root", children: node } : node;
}

export { handlers as defaultHandlers } from "./handlers";
