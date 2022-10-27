import type { Node } from "unist";

export type ReMJMLComponent<Attributes = {}, Children = any> = Node & {
  type: "component";
  tagName: string;
  attributes: Attributes;
  children: Children;
  content: string;
};
