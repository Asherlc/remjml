import { isUndefined, omitBy } from "lodash-es";
import type { MjmlNode } from "mjmlast";

export interface MJMLJsonObject<
  A extends object = Record<string, any>,
  Children extends MJMLJsonObject[] = any[]
> {
  readonly tagName: string;
  readonly attributes: A;
  readonly children?: Children;
  readonly content?: string;
}

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
