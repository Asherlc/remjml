import { isUndefined, omitBy } from "lodash-es";
import type { MJMLJsonObject } from "mjml-types";
import type { MjmlNode as MjmlAstNode } from "mjmlast";

export default function mjmlJsonToRemjml(
  mjmlJson: MJMLJsonObject
): MjmlAstNode {
  const childNodes: MjmlAstNode[] | undefined =
    mjmlJson.children?.map(mjmlJsonToRemjml);

  const node: MjmlAstNode = omitBy(
    {
      type: mjmlJson.tagName,
      attributes: mjmlJson.attributes,
      children: childNodes,
      content: mjmlJson.content,
    },
    isUndefined
  ) as unknown as MjmlAstNode;

  return node;
}
