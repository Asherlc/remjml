import type { Element as HElement } from "hast";
import type { Parent as UnistParent } from "unist";
import type { Component } from "./Component";
import type { Text } from "./Text";

export interface EndComponent extends Component, UnistParent {
  children: Text[] | HElement[];
}
