import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";

export interface MjHead extends ParentComponent {
  attributes: never;
  type: "mj-head";
  children: Text[];
}
