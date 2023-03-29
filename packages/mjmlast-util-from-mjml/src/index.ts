import { location } from "vfile-location";
import { parse, HTMLElement, NodeType } from "node-html-parser";

import { MjmlNode, nodeTypes, Text } from "mjmlast";

type State = {
  location: ReturnType<typeof location>;
};

type Content = MjmlNode | Text;

function transformMjmlNode(node: HTMLElement, state: State) {
  const children = transformChildren(node.childNodes, state);

  return {
    type: node.rawTagName,
    attributes: { ...node.rawAttributes },
    children,
  };
}

function transformElement(node: HTMLElement, state: State): Content {
  const children = transformChildren(node.childNodes, state);

  return {
    type: "element",
    tagName: node.rawTagName,
    properties: node.rawAttributes,
    children,
  };
}

function transformText(node: HTMLElement): Content {
  return { type: "text", value: node.text };
}

function transformChildren(children: HTMLElement[], state: State) {
  const results: Content[] = [];
  let index = -1;

  while (++index < children.length) {
    const from = children[index];
    let to: Content | undefined;

    if (from.nodeType === NodeType.TEXT_NODE) {
      to = transformText(from);
    } else if (nodeTypes.has(from.rawTagName)) {
      to = transformMjmlNode(from, state);
    } else {
      to = transformElement(from, state);
    }

    if (to) {
      patch(from, to, state);
      results.push(to);
    }
  }

  return results;
}

export function fromMjml(mjml: string): MjmlNode {
  const loc = location(mjml);

  const element: HTMLElement = parse(String(mjml)).childNodes[0];

  const state = { location: loc };
  const root = transformElement(element, state);
  return root;
}

function patch(from: HTMLElement, to: MjmlNode, state: State): void {
  const start = state.location.toPoint(from.range[0]);
  const end = state.location.toPoint(from.range[1]);

  if (start && end) {
    to.position = { start, end };
  }
}
