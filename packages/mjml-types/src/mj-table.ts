import type { ParentComponent } from "./ParentComponent";
import type { EndComponent } from "./EndComponent";

type Attributes = {
  align: "left" | "right" | "center" | "justify";
  border: string;
  cellpadding: "integer";
  cellspacing: "integer";
  "container-background-color": string;
  color: string;
  "font-family": string;
  "font-size": string;
  "font-weight": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  role: "none" | "presentation";
  "table-layout": "auto" | "fixed" | "initial" | "inherit)";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export interface MjTable extends ParentComponent, EndComponent {
  attributes: Attributes;
  tagName: "mj-table";
}
