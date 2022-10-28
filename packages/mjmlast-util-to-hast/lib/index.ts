import type {
  Root as HRoot,
  Parent as HParent,
  Properties as HProperties,
  ElementContent as HContent,
} from "hast";
import { pointStart, pointEnd, PositionLike } from "unist-util-position";
import { one } from "./traverse";
import { handlers as defaultHandlers } from "./handlers";
import type { MjmlNode, Parent } from "mjmlast";

type HastNode = HRoot | HParent | HParent["children"][number];

type HFunction = {
  (
    node: MjmlNode | PositionLike | null | undefined,
    tagName: string,
    props: HProperties,
    children?: HContent[]
  ): HContent;
  (
    node: MjmlNode | PositionLike | null | undefined,
    tagName: string,
    children?: HContent[]
  ): HContent;
};

export type Handlers = Record<string, Handler>;

type HFields = {
  dangerous: boolean;
  handlers: Handlers;
  unknownHandler?: Handler;
};

export type H = HFunction & HFields;

export type Handler = (
  h: H,
  node: any,
  parent?: Parent | null
) => HContent | Array<HContent> | null;

type Options = {
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

function factory({
  allowDangerousHtml = false,
  handlers,
  unknownHandler,
}: Options = {}): H {
  const h: H = (
    node: MjmlNode | PositionLike | null | undefined,
    tagName: string,
    props?: HProperties | HContent[],
    children?: HContent[]
  ): HContent => {
    if (Array.isArray(props)) {
      children = props as HContent[];
      props = {};
    }

    const withPosition: HContent = addPosition(node, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || [],
    });

    return withPosition;
  };

  h.dangerous = allowDangerousHtml;
  h.handlers = { ...defaultHandlers, ...handlers };
  h.unknownHandler = unknownHandler;

  return h;
}

export function toHast(
  tree: MjmlNode,
  options: Options
): HastNode | null | undefined {
  const h = factory(options);
  const node = one(h, tree, null);

  return Array.isArray(node) ? { type: "root", children: node } : node;
}

export { handlers as defaultHandlers } from "./handlers";
