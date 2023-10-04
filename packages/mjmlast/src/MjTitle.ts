import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";

export interface MjTitle extends ParentComponent {
  attributes: never;
  type: "mj-title";
  children: Text[];
}
