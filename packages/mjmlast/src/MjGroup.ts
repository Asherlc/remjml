import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./MjRaw";
import type { MjColumn } from "./MjColumn";

export type Attributes = {
  "background-color": string;
  direction: "ltr" | "rtl";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export type Child = MjColumn | MjRaw;

export interface MjGroup extends ParentComponent {
  attributes: Attributes;
  type: "mj-group";
  children: Child[];
}
