import type { Component } from "./Component";

export interface MjFont extends Component {
  attributes: {
    name: string;
    href: string;
  };
  type: "mj-font";
}
