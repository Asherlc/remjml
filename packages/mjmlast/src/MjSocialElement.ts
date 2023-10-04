import type { BodyComponent } from "./BodyComponent";
import type { EndComponent } from "./EndComponent";

type Attributes = {
  align: "left" | "right" | "center" | "justify";
  "background-color": string;
  color: string;
  "border-radius": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  href: string;
  "icon-size": string;
  "icon-height": string;
  "icon-padding": string;
  "line-height": string;
  name: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-padding": string;
  rel: string;
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  title: string;
  target: string;
  "text-decoration": string;
  "vertical-align": "top" | "middle" | "bottom";
};

export interface MjSocialElement extends BodyComponent, EndComponent {
  attributes: Attributes;
  type: "mj-social-element";
}
