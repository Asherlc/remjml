import type { Component } from "./component";

export interface MjSelector extends Component {
  attributes: {
    path: string;
  };
  tagName: "mj-selector";
}
