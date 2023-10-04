import type { Component } from "./Component";

export interface MjSelector extends Component {
  attributes: {
    path: string;
  };
  type: "mj-preview";
}
