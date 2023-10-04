import type { Node } from "unist";
import type { BaseAttributes } from "./EmptyAttributes";

export interface Component extends Node {
  attributes: BaseAttributes;
}
