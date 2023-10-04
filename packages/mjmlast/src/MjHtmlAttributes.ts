import type { ParentComponent } from "./ParentComponent";
import type { MjSelector } from "./MjSelector";

export interface MjHtmlAttributes extends ParentComponent {
  attributes: never;
  children: MjSelector[];
  type: "mj-html-attributes";
}
