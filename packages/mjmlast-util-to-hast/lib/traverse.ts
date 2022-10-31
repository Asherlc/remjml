import { ElementContent as HContent, Parent as HParent } from "hast";
import { MjmlNode, Parent as MjmlParent } from "mjmlast";
import { u } from "unist-builder";
import { addPosition, Context, Options } from ".";
import { h as hastH } from "hastscript";

function unknown(node: MjmlNode, options: Options, context: Context) {
  if ("value" in node && typeof node.value === "string") {
    const value = node.value;

    return addPosition(node, u("text", value));
  }

  const nodes = all(node, options, context);
  return hastH("div", nodes);
}

export function one(
  node: MjmlNode,
  parent: MjmlParent | HParent | null,
  options: Options,
  context: Context
): HContent {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  const handler = options.handlers?.[type];

  if (handler) {
    handler(node, parent, options);
  } else if (options.unknownHandler) {
    options.unknownHandler(node, parent, options);
  }

  return unknown(node, options);
}

export function all(
  parent: MjmlNode,
  options: Options,
  context: Context
): HContent[] {
  const values: HContent[] = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const result = one(nodes[index], parent, options, context);

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
