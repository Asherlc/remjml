import { u } from "unist-builder";
import { Handler } from "..";

export function text(h: Handler, node: Text) {
  return h.augment(node, u("text", String(node.value)));
}
