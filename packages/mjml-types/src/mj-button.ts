import { BodyComponent } from "./BodyComponent";
import { EndComponent } from "./EndComponent";

type Attributes = {
  align: "left" | "right" | "center" | "justify";
  "background-color": string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  border: string;
  color: string;
  "container-background-color": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  height: string;
  href: string;
  name: string;
  title: string;
  "inner-padding": string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  rel: string;
  target: string;
  "text-decoration": string;
  "text-transform": string;
  "vertical-align": "top" | "middle" | "bottom";
  "text-align": "left" | "right" | "center";
  width: string;
};

export interface MjButton extends BodyComponent, EndComponent {
  attributes: Attributes;
  tagName: "mj-button";
}
