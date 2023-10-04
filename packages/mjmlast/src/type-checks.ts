import type { Node } from "unist";
import type { MjmlComponent } from "./types";
import type { MjClass } from "./MjClass";
import type { Text } from "./Text";
import { componentTypes } from "./componentTypes";

export function isComponent(node: Node): node is MjmlComponent {
  return componentTypes.has(node.type);
}

export function isMjClass(node: Node): node is MjClass {
  return node.type === "mj-class";
}

export function isText(node: Node): node is Text {
  return node.type === "text";
}
