import { Component } from "./component";

export type Attributes = Partial<{
  alt: string;
  href: string;
  name: string;
  src: string;
  srcset: string;
  sizes: string;
  title: string;
  rel: string;
  align: "left" | "right" | "center" | "justify";
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-right": string;
  "border-top": string;
  "border-radius": string;
  "container-background-color": string;
  "fluid-on-mobile": "boolean";
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  target: string;
  width: string;
  height: string;
  "max-height": string;
  "font-size": string;
  usemap: string;
}>;

export interface MjImage extends Component {
  attributes: Attributes;
  tagName: "mj-image";
}
