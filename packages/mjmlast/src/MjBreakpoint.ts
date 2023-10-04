import type { Component } from "./Component";

export interface MjBreakpoint extends Component {
  attributes: { width: string };
  type: "mj-breakpoint";
}
