import { EndComponent } from "./EndComponent";

type Attributes = {
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

export interface MjNavbarLink extends EndComponent {
  attributes: Attributes;
  tagName: "mj-navbar-link";
}
