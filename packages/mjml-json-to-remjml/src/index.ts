import { isUndefined, omitBy } from "lodash-es";
import { MJMLJsonObject, MjmlNode } from "mjml-types";

export default function mjmlJsonToRemjml(mjmlJson: MJMLJsonObject): MjmlNode {
  const childNodes: MjmlNode[] | undefined =
    mjmlJson.children?.map(mjmlJsonToRemjml);

  const node: MjmlNode = omitBy(
    {
      type: mjmlJson.tagName,
      attributes: mjmlJson.attributes,
      children: childNodes,
      content: mjmlJson.content,
    },
    isUndefined
  ) as unknown as MjmlNode;

  return node;
}
