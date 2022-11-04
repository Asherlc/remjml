import { Element as HElement, Comment as HComment, Text as HText } from "hast";
import { u } from "unist-builder";
import { MjmlNode, nodeTypes } from "mjmlast";
import {
  Node,
  Root,
  Element as XElement,
  Parent as XParent,
  Comment as XComment,
  Text as XText,
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

function isText(node: Node): node is XText {
  return node.type === "text";
}

function handler(node: Node): MjmlNode | HElement | XComment {
  const nodeIsXElement = isXElement(node);

  if (nodeIsXElement && nodeTypes.has(node.name)) {
    return {
      position: node.position,
      type: node.name,
      attributes: node.attributes || {},
      children: all(node) as any,
    } as MjmlNode;
  }

  if (isXElement(node)) {
    return {
      position: node.position,
      type: "element",
      tagName: node.name,
      properties: node.attributes,
      children: all(node) as any,
    };
  }

  if (isComment(node)) {
    return node as HComment;
  }

  if (isText(node)) {
    return node as HText;
  }

  throw new Error(`Unrecognized node type: ${node.type}`);
}

function one(node: Node): MjmlNode | HElement {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  return handler(node) as any;
}

function all(parent: XParent): (MjmlNode | HElement)[] {
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

export function fromXast(node: Node): MjmlNode | Root {
  if (
    isRoot(node) &&
    node.children.length === 1 &&
    isXElement(node.children[0]) &&
    node.children[0].name === "mjml"
  ) {
    return one(node.children[0] as any) as any;
  }

  if (isRoot(node)) {
    return u("root", all(node)) as any;
  }

  return one(node) as any;
}
