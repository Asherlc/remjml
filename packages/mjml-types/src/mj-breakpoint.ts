import type { Component } from "./Component";

export interface MjBreakpoint extends Component {
  attributes: { width: string };
  tagName: "mj-breakpoint";
}
