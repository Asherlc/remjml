import type { Component } from "./Component";
import type { BaseAttributes } from "./EmptyAttributes";

export interface BodyComponent extends Component {
  attributes: { "css-class"?: string; "mj-class"?: string } & BaseAttributes;
}
