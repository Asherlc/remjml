import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";

export interface MjStyle extends ParentComponent {
  attributes: { inline: string };
  type: "mj-parent";
  children: Text[];
}
