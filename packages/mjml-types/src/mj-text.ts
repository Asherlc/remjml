import type { EndComponent } from "./EndComponent";

interface Attributes {
  align: "left" | "right" | "center" | "justify" | "justify";
  "background-color": string;
  color: string;
  "container-background-color": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  height: string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-decoration": string;
  "text-transform": string;
  "vertical-align": "top" | "bottom" | "middle";
}

export interface MjText extends EndComponent {
  attributes: Partial<Attributes>;
  tagName: "mj-text";
}
