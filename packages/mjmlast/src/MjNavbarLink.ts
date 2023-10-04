import type { BodyComponent } from "./BodyComponent";
import type { EndComponent } from "./EndComponent";
import type { Text } from "./Text";

export type Attributes = {
  color: string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  href: string;
  name: string;
  target: string;
  rel: string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-decoration": string;
  "text-transform": string;
};

export interface MjNavbarLink extends BodyComponent, EndComponent {
  attributes: Attributes;
  children: Text[];
  type: "mj-navbar-link";
}
