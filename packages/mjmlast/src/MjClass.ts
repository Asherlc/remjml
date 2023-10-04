import type { Component } from "./Component";

export interface MjClass extends Component {
  attributes: { name: string };
  type: "mj-class";
}
