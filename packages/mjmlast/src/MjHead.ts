import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";

export interface MjHead extends ParentComponent {
  type: "mj-head";
  children: Text[];
}
