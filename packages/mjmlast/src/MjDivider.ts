import type { BodyComponent } from "./BodyComponent";
import type { Component } from "./Component";

export type Attributes = {
  "border-color": string;
  "border-style": string;
  "border-width": string;
  "container-background-color": string;
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  width: string;
  align: "left" | "right" | "center" | "justify";
};

export interface MjDivider extends Component, BodyComponent {
  attributes: Attributes;
  type: "mj-divider";
}
