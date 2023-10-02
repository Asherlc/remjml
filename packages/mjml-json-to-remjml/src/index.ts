import { isUndefined, omitBy } from "lodash-es";
import {
  Component,
  EndComponent,
  ParentComponent,
  isEndComponent,
  isParentComponent,
} from "mjml-types";
import type { MjmlNode as MjmlAstNode } from "mjmlast";

export default function mjmlJsonToRemjml(
  mjmlJson: Component | ParentComponent | EndComponent
): MjmlAstNode {
  let childNodes: MjmlAstNode[] | undefined;

  if (isParentComponent(mjmlJson)) {
    childNodes = mjmlJson.children?.map(mjmlJsonToRemjml);
  }

  const node: MjmlAstNode = omitBy(
    {
      type: mjmlJson.tagName,
      attributes: mjmlJson.attributes,
      children: childNodes,
      content: isEndComponent(mjmlJson) ? mjmlJson.content : undefined,
    },
    isUndefined
  ) as unknown as MjmlAstNode;

  return node;
}
