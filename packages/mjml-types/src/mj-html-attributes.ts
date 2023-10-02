import type { ParentComponent } from "./ParentComponent";
import type { MjSelector } from "./mj-selector";

export interface MjHtmlAttributes extends ParentComponent {
  children: MjSelector[];
  tagName: "mj-html-attributes";
}
