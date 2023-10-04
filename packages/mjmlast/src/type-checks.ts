import type { Node } from "unist";
import type { MjmlComponent } from "./MjmlComponent";
import type { MjClass } from "./MjClass";
import type { Text } from "./Text";
import { componentTypes } from "./componentTypes";
import type { MjRaw } from "./MjRaw";
import type { MjColumn } from "./MjColumn";

export function isComponent(node: Node): node is MjmlComponent {
  return componentTypes.has(node.type);
}

export function isMjClass(node: Node): node is MjClass {
  return node.type === "mj-class";
}

export function isText(node: Node): node is Text {
  return node.type === "text";
}

export function isMjRaw(node: Node): node is MjRaw {
  return node.type === "mj-raw";
}

export function isMjColumn(node: Node): node is MjColumn {
  return node.type === "mj-column";
}
