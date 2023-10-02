import type { ParentComponent } from "./ParentComponent";
import type { MjImage } from "./mj-image";
import type { MjSpacer } from "./mj-spacer";
import type { MjTable } from "./mj-table";
import type { MjRaw } from "./mj-raw";
import type { MjSocial } from "./mj-social";
import type { MjNavbar } from "./mj-navbar";
import type { MjDivider } from "./mj-divider";
import type { MjCarousel } from "./mj-carousel";
import type { MjButton } from "./mj-button";
import type { MjText } from "./mj-text";
import type { MjAccordion } from "./mj-accordion";

type Attributes = {
  mode: string;
  height: string;
  "background-url": string;
  "background-width": string;
  "background-height": string;
  "background-position": string;
  "border-radius": string;
  "container-background-color": string;
  "inner-background-color": string;
  "inner-padding": string;
  "inner-padding-top": string;
  "inner-padding-left": string;
  "inner-padding-right": string;
  "inner-padding-bottom": string;
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  "background-color": string;
  "vertical-align": "top" | "middle" | "bottom";
};

type Child =
  | MjButton
  | MjAccordion
  | MjCarousel
  | MjDivider
  | MjImage
  | MjSocial
  | MjSpacer
  | MjTable
  | MjText
  | MjNavbar
  | MjRaw;

export interface MjHero extends ParentComponent {
  tagName: "mj-hero";
  attributes: Attributes;
  children: Child[];
}
