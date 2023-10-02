import type { Component } from "./component";

export interface EndComponent extends Component {
  content?: string;
}

export function isEndComponent(
  component: Component
): component is EndComponent {
  return "content" in component;
}
