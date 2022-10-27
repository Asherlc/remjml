import { Content } from "hast";
import { MjmlAstNode } from "mjmlast";
import { u } from "unist-builder";
import { H, Handler } from ".";

const own = {}.hasOwnProperty;

function unknown(h: H, node: MjmlAstNode) {
  const data = node.data || {};

  if (
    "value" in node &&
    !(
      own.call(data, "hName") ||
      own.call(data, "hProperties") ||
      own.call(data, "hChildren")
    )
  ) {
    return h.augment(node, u("text", node.value));
  }

  return h(node, "div", all(h, node));
}

export function one(h: H, node: MjmlAstNode, parent: Parent | null) {
  const type = node && node.type;
  let fn: Handler;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  if (own.call(h.handlers, type)) {
    fn = h.handlers[type];
  } else if (h.passThrough && h.passThrough.includes(type)) {
    fn = returnNode;
  } else {
    fn = h.unknownHandler;
  }

  return (typeof fn === "function" ? fn : unknown)(h, node, parent);
}

function returnNode(h: H, node: MjmlAstNode) {
  return "children" in node ? { ...node, children: all(h, node) } : node;
}

export function all(h: H, parent: MjmlAstNode) {
  const values: Content[] = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const result = one(h, nodes[index], parent);

      if (result) {
        if (index && nodes[index - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }

          if (!Array.isArray(result) && result.type === "element") {
            const head = result.children[0];

            if (head && head.type === "text") {
              head.value = head.value.replace(/^\s+/, "");
            }
          }
        }

        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }

  return values;
}
