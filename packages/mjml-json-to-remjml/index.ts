import type { MJMLJsonObject } from "mjml";
import { ReMJMLComponent } from "remjml";

export default function mjmlJsonToRemjml(
  mjmlJson: MJMLJsonObject
): ReMJMLComponent {
  const childNodes: ReMJMLComponent[] = (mjmlJson.children || []).map(
    mjmlJsonToRemjml
  );

  const node: ReMJMLComponent = {
    type: "component",
    tagName: mjmlJson.tagName,
    attributes: mjmlJson.attributes,
    children: childNodes,
    content: mjmlJson.content,
  };

  return node;
}
