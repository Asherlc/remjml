import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { Text } from "./Text";

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

export interface MjTable extends ParentComponent, BodyComponent {
  attributes: Attributes;
  type: "mj-table";
  children: Text[];
}
