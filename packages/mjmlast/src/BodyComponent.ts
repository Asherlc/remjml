import type { Component } from "./Component";
import type { BaseAttributes } from "./BaseAttributes";

export interface BodyComponent extends Component {
  attributes: { "css-class"?: string; "mj-class"?: string } & BaseAttributes;
}
