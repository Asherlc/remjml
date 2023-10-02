import { Component } from "./component";

export interface BodyComponent extends Component {
  attributes: {
    width?: string;
    "background-color"?: string;
  };
}
