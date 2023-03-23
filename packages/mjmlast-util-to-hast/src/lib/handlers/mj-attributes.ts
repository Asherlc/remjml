import type { MjAttributes, MjHead } from "mjmlast";
import { Context, Options } from "..";

export function mjAttributes(
  node: MjAttributes,
  parent: MjHead,
  options: Options,
  context: Context
): void {
  node.children.forEach((child) => {
    if (child.type === "mj-class") {
      const { name: className, ...properties } = child.attributes;

      context.cssClasses[className] = properties;
    } else {
      context.defaultAttributes[child.type] = child.attributes;
    }
  });
}
