import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./mj-raw";
import type { MjColumn } from "./mj-column";
import type { BodyComponent } from "./BodyComponent";

type Attributes = {
  "background-color": string;
  direction: "ltr" | "rtl";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export interface MjGroup extends BodyComponent, ParentComponent {
  tagName: "mj-group";
  children: (MjColumn | MjRaw)[];
  attributes: Attributes;
}
