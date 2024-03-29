import type { Text } from "mjmlast";
import type { Node, Parent } from "unist";

export function toString(value: unknown): string {
  return one(value);
}

function isText(value: unknown): value is Text {
  return isNode(value) && "value" in value;
}

function one(value: unknown): string {
  if (isText(value)) {
    return value.value;
  }

  if (isNode(value) && isParent(value)) {
    return all(value.children);
  }

  if (Array.isArray(value)) {
    return all(value);
  }

  throw new Error(`Invalid type`);
}

function all(values: unknown[]): string {
  const result: string[] = [];
  let index = -1;

  while (++index < values.length) {
    result[index] = one(values[index]);
  }

  return result.join("");
}

function isNode(value: unknown): value is Node {
  return Boolean(value && typeof value === "object");
}

function isParent(value: Node): value is Parent {
  return "children" in value;
}
