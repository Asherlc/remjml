import type { MjmlNode } from "mjmlast";

export interface MJMLJsonObject<
  A extends object = {},
  Children extends MJMLJsonObject[] = []
> {
  readonly tagName: string;
  readonly attributes: A;
  readonly children?: Children;
  readonly content?: string;
}

export default function mjmlJsonToRemjml(mjmlJson: MJMLJsonObject): MjmlNode {
  const childNodes: MjmlNode[] = (mjmlJson.children || []).map(
    mjmlJsonToRemjml
  );

  const node: MjmlNode = {
    type: mjmlJson.tagName,
    attributes: mjmlJson.attributes,
    children: childNodes,
    content: mjmlJson.content,
  } as any as MjmlNode;

  return node;
}
