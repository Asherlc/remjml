import { ParentComponent } from "./ParentComponent";
import { MjRaw } from "./mj-raw";
import { MjColumn } from "./mj-column";
import { BodyComponent } from "./BodyComponent";

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
