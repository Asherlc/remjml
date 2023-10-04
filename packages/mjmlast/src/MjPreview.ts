import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";
import type { EmptyAttributes } from "./EmptyAttributes";

export interface MjPreview extends ParentComponent {
  attributes: EmptyAttributes;
  type: "mj-preview";
  children: Text[];
}
