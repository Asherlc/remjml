import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjNavbarLink } from "./MjNavbarLink";
import type { MjRaw } from "./MjRaw";

export type Attributes = {
  align: "left" | "right" | "center" | "justify";
  "base-url": string;
  hamburger: string;
  "ico-align": string;
  "ico-open": string;
  "ico-close": string;
  "ico-color": string;
  "ico-font-size": string;
  "ico-font-family": string;
  "ico-text-transform": string;
  "ico-padding": string;
  "ico-padding-left": string;
  "ico-padding-top": string;
  "ico-padding-right": string;
  "ico-padding-bottom": string;
  padding: string;
  "padding-left": string;
  "padding-top": string;
  "padding-right": string;
  "padding-bottom": string;
  "ico-text-decoration": string;
  "ico-line-height": string;
};

export interface MjNavbar extends ParentComponent, BodyComponent {
  attributes: Attributes & BodyComponent["attributes"];
  children: (MjNavbarLink | MjRaw)[];
  type: "mj-navbar";
}
