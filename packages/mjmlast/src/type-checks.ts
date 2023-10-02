import { Node } from "unist";
import { MjClass, MjmlComponent, Text, componentTypes } from "./types";

export function isComponent(node: Node): node is MjmlComponent {
  return componentTypes.has(node.type);
}

export function isMjClass(node: Node): node is MjClass {
  return node.type === "mj-class";
}

export function isText(node: Node): node is Text {
  return node.type === "text";
}
