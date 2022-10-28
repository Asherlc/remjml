import type { Text } from "mjmlast";
import { u } from "unist-builder";
import { addPosition, H } from "..";
import { Text as HText } from "hast";

export function text(h: H, node: Text): HText {
  const hText = u("text", String(node.value));

  return addPosition(node, hText);
}
