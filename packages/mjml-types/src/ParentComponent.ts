import { Component } from "./component";

export interface ParentComponent extends Component {
  children: Component[];
}

export function isParentComponent(
  component: Component
): component is ParentComponent {
  return "children" in component;
}
