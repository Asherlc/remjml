import type { RootContent as HRootContent } from "hast";
import type { MjmlNode, ParentComponent as MjmlParent } from "mjmlast";
import type { Options } from ".";
import type { Handler } from "./Handler";
import type { Context } from "./types";
import type { Node as UnistNode } from "unist";

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
    options.unknownHandler) as Handler;
  console.log(type, handler);

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

      if (!node) {
        throw new Error(`No node with index ${index}`);
      }

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
