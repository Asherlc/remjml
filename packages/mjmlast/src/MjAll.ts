import type { Component } from "./Component";

export interface MjAll extends Component {
  attributes: Record<string, string>;
  type: "mj-all";
}
