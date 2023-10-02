import { ParentComponent } from "./ParentComponent";
import { MjImage } from "./mj-image";
import { MjSpacer } from "./mj-spacer";
import { MjTable } from "./mj-table";
import { MjRaw } from "./mj-raw";
import { MjSocial } from "./mj-social";
import { MjNavbar } from "./mj-navbar";
import { MjDivider } from "./mj-divider";
import { MjCarousel } from "./mj-carousel";
import { BodyComponent } from "./BodyComponent";
import { MjText } from "./mj-text";
import { MjButton } from "./mj-button";
import { MjAccordion } from "./mj-accordion";

export type MjColumnAttributes = Partial<{
  "background-color": string;
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  direction: "ltr" | "rtl";
  "inner-background-color": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  "inner-border": string;
  "inner-border-bottom": string;
  "inner-border-left": string;
  "inner-border-radius": string;
  "inner-border-right": string;
  "inner-border-top": string;
  padding: string;
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
}>;

export type MjColumnChild =
  | MjAccordion
  | MjButton
  | MjCarousel
  | MjDivider
  | MjImage
  | MjRaw
  | MjSocial
  | MjSpacer
  | MjTable
  | MjText
  | MjNavbar;

export interface MjColumn extends BodyComponent, ParentComponent {
  children: MjColumnChild[];
  attributes: MjColumnAttributes;
  tagName: "mj-column";
}
