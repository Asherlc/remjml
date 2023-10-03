import type { Text } from "mjmlast";
import { u } from "unist-builder";
import { addPosition } from "..";
import type { Text as HText } from "hast";

export const text = function (node: Text): HText {
  const hText = u("text", String(node.value));

  return addPosition(node, hText);
};
