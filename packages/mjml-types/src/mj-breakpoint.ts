import type { Component } from "./component";

export interface MjBreakpoint extends Component {
  attributes: { width: string };
  tagName: "mj-breakpoint";
}
