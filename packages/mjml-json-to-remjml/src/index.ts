import type { MJMLJsonObject } from "mjml";
import type { MjmlNode } from "mjmlast";

export default function mjmlJsonToRemjml(mjmlJson: MJMLJsonObject): MjmlNode {
  const childNodes: MjmlNode[] = (mjmlJson.children || []).map(
    mjmlJsonToRemjml
  );

  const node: MjmlNode = {
    tagName: mjmlJson.tagName,
    attributes: mjmlJson.attributes,
    children: childNodes,
    content: mjmlJson.content,
  } as any as MjmlNode;

  return node;
}
