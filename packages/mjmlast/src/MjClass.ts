import type { Component } from "./Component";

export interface MjClass extends Component {
  attributes: { name: string } & Record<string, string>;
  type: "mj-class";
}
