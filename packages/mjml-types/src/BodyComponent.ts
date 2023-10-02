import type { Component } from "./Component";

export interface BodyComponent extends Component {
  attributes: {
    width?: string;
    "background-color"?: string;
  };
}
