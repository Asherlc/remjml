import { ParentComponent } from "./ParentComponent";
import { MjSelector } from "./mj-selector";

export interface MjHtmlAttributes extends ParentComponent {
  children: MjSelector[];
  tagName: "mj-html-attributes";
}
