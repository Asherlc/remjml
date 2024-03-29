import type { ParentComponent } from "./ParentComponent";
import type { MjSocialElement } from "./mj-social-element";
import type { MjRaw } from "./mj-raw";

export type Attributes = {
  align: "left" | "right" | "center" | "justify";
  "border-radius": string;
  "container-background-color": string;
  color: string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  "icon-size": string;
  "icon-height": string;
  "icon-padding": string;
  "inner-padding": string;
  "line-height": string;
  mode: "horizontal" | "vertical";
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "table-layout": "auto" | "fixed";
  "text-padding": string;
  "text-decoration": string;
  "vertical-align": "top" | "middle" | "bottom";
};

export interface MjSocial extends ParentComponent {
  attributes: Attributes;
  children: (MjSocialElement | MjRaw)[];
  tagName: "mj-social";
}
