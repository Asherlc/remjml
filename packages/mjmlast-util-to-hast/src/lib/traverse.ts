import type { RootContent as HRootContent } from "hast";
import type { MjmlNode, Parent as MjmlParent } from "mjmlast";
import { u } from "unist-builder";
import type { Options } from ".";
import type { Handler } from "./Handler";
import { addPosition } from ".";
import { h as hastH } from "hastscript";
import type { Context } from "./types";
import type { Node as UnistNode } from "unist";

function unknown(
  node: MjmlNode,
  parent: MjmlParent | null,
  options: Options,
  context: Context
) {
  if ("value" in node && typeof node.value === "string") {
    const value = node.value;

    return addPosition(node, u("text", value));
  }

  const nodes = all(node, options, context);
  return hastH("div", nodes);
}

export function one(
  node: UnistNode,
  parent: MjmlParent | null,
  options: Options,
  context: Context
): HRootContent | HRootContent[] {
  const type = node && node.type;

  // Fail on non-nodes.
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }

  const handler: Handler = (options.handlers?.[type] ||
    options.unknownHandler ||
    unknown) as Handler;

  return handler(node, parent, options, context);
}

export function all(
  parent: MjmlNode,
  options: Options,
  context: Context
): HRootContent[] {
  const values: HRootContent[] = [];

  if ("children" in parent) {
    const nodes = parent.children;
    let index = -1;

    while (++index < nodes.length) {
      const node = nodes[index];
      const result = one(node, parent, options, context);

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
