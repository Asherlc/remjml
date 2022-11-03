import { Element as HElement, Comment as HComment } from "hast";
import { u } from "unist-builder";
import { MjmlNode, nodeTypes } from "mjmlast";
import {
  Node,
  Root,
  Element as XElement,
  Parent as XParent,
  Comment as XComment,
} from "xast";

function isRoot(node: Node): node is Root {
  return node.type === "root";
}

function isXElement(node: Node): node is XElement {
  return node.type === "element";
}

function isComment(node: Node): node is XComment {
  return node.type === "comment";
}

function handler(node: Node): MjmlNode | HElement | XComment {
  if (isXElement(node) && nodeTypes.has(node.type)) {
    return {
      ...node,
      type: node.name,
      attributes: node.attributes || {},
      children: all(node) as any,
    } as MjmlNode;
  }

  if (isXElement(node)) {
    return {
      ...node,
      tagName: node.name,
      properties: node.attributes,
      children: all(node) as any,
    };
  }

  if (isComment(node)) {
    return node as HComment;
  }

  throw new Error(`Unrecognized node type: ${node.type}`);
}

export function one(node: Node): MjmlNode | HElement {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  return handler(node) as any;
}

export function all(parent: XParent): (MjmlNode | HElement)[] {
  const values: (MjmlNode | HElement)[] = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const node = nodes[index];
      const result = one(node);

      if (!result) {
        continue;
      }

      if (Array.isArray(result)) {
        values.push(...result);
      } else {
        values.push(result);
      }
    }
  }

  return values;
}

export function fastXmlParserToMjmlast(node: Node): MjmlNode | Root {
  if (isRoot(node)) {
    return u("root", all(node)) as any;
  }

  return one(node) as any;
}
