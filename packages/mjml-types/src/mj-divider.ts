import { BodyComponent } from "./BodyComponent";

export interface MjDivider extends BodyComponent {
  tagName: "mj-divider";
  attributes: Partial<{
    "border-color": string;
    "border-style": string;
    "border-width": string;
    "container-background-color": string;
    padding: string;
    "padding-bottom": string;
    "padding-left": string;
    "padding-right": string;
    "padding-top": string;
    width: string;
    align: "left" | "right" | "center" | "justify";
  }>;
}
