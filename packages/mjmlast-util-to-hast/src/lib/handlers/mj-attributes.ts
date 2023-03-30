import type { MjAttributes, MjHead } from "mjmlast";
import { Options } from "..";
import { Context } from "../types";

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
      context.defaultAttributes = {
        ...(context.defaultAttributes || {}),
        [child.type]: child.attributes,
      };
    }
  });
}
