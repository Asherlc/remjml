import { ElementContent as HContent, Parent as HParent } from "hast";
import { MjmlNode, Parent as MjmlParent } from "mjmlast";
import { u } from "unist-builder";
import { addPosition, H, Handler } from ".";

const own = {}.hasOwnProperty;

function unknown(h: H, node: MjmlNode) {
  if ("value" in node && typeof node.value === "string") {
    const value = node.value;

    return addPosition(node, u("text", value));
  }

  const nodes = all(h, node);
  return h(node, "div", nodes);
}

export function one(
  h: H,
  node: MjmlNode,
  parent: MjmlParent | HParent | null
): HContent {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  if (own.call(h.handlers, type)) {
    h.handlers[type](h, node, parent);
  } else if (h.unknownHandler) {
    h.unknownHandler(h, node, parent);
  }

  return unknown(h, node);
}

export function all(h: H, parent: MjmlNode): HContent[] {
  const values: HContent[] = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const result = one(h, nodes[index], parent);

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
