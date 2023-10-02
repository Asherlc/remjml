import { location } from "vfile-location";
import { parse, HTMLElement, NodeType, Node, TextNode } from "node-html-parser";
import type { Element as HElement } from "hast";

import { MjmlNode, MjmlRoot, nodeTypes, Text } from "mjmlast";

type State = {
  location: ReturnType<typeof location>;
};

type Content = MjmlNode | Text | HElement;

function transformMjmlNode(node: HTMLElement, state: State): MjmlNode {
  const children = transformChildren(node.childNodes, state);

  return {
    type: node.rawTagName,
    attributes: { ...node.rawAttributes },
    children,
  } as MjmlNode;
}

function transformElement(node: HTMLElement, state: State): HElement {
  const children: HElement[] = transformChildren(
    node.childNodes,
    state
  ) as HElement[];

  return {
    type: "element",
    tagName: node.rawTagName,
    properties: node.rawAttributes,
    children,
  };
}

function transformText(node: TextNode): Content {
  return { type: "text", value: node.text };
}

function isTextNode(node: Node): node is TextNode {
  return node.nodeType === NodeType.TEXT_NODE;
}

function isHtmlElement(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

function isMjmlNode(node: HTMLElement): boolean {
  return nodeTypes.has((node as HTMLElement).rawTagName);
}

function transformChildren(children: Node[], state: State): Content[] {
  const results: Content[] = [];
  let index = -1;

  while (++index < children.length) {
    const from = children[index];
    let to: Content;

    if (isTextNode(from)) {
      to = transformText(from);
    } else if (isHtmlElement(from) && isMjmlNode(from)) {
      to = transformMjmlNode(from, state);
    } else if (isHtmlElement(from)) {
      to = transformElement(from, state);
    } else {
      throw new Error(`Unknown node type`);
    }

    if (to) {
      patch(from, to, state);
      results.push(to);
    }
  }

  return results;
}

export function fromMjml(mjml: string): MjmlRoot {
  const loc = location(mjml);

  const element: HTMLElement = parse(String(mjml)).childNodes[0] as HTMLElement;

  const state = { location: loc };
  const root: MjmlRoot = transformMjmlNode(element, state) as MjmlRoot;

  return root;
}

function patch(from: Node, to: Content, state: State): void {
  const start = state.location.toPoint(from.range[0]);
  const end = state.location.toPoint(from.range[1]);

  if (start && end) {
    to.position = { start, end };
  }
}
