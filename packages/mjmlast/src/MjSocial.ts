import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjSocialElement } from "./MjSocialElement";
import type { MjRaw } from "./MjRaw";

type Attributes = {
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
  mode: "enum(horizontal,vertical)";
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "table-layout": "enum(auto,fixed)";
  "text-padding": string;
  "text-decoration": string;
  "vertical-align": "top" | "middle" | "bottom";
};

export interface MjSocial extends ParentComponent, BodyComponent {
  type: "mj-social";
  children: (MjSocialElement | MjRaw)[];
  attributes: Attributes;
}
