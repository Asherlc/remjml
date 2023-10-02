import type { Component } from "./Component";

export interface MjSelector extends Component {
  attributes: {
    path: string;
  };
  tagName: "mj-selector";
}
