import { isUndefined, omitBy } from "lodash-es";
import { MJMLJsonObject } from "mjml-types";
import { MjmlNode as MjmlAstNode } from "mjmlast";

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
