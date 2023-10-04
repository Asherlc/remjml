import type { ParentComponent } from "./ParentComponent";
import type { MjImage } from "./mj-image";
import type { MjSpacer } from "./mj-spacer";
import type { MjTable } from "./mj-table";
import type { MjRaw } from "./mj-raw";
import type { MjSocial } from "./mj-social";
import type { MjNavbar } from "./mj-navbar";
import type { MjDivider } from "./mj-divider";
import type { MjCarousel } from "./mj-carousel";
import type { BodyComponent } from "./BodyComponent";
import type { MjText } from "./mj-text";
import type { MjButton } from "./mj-button";
import type { MjAccordion } from "./mj-accordion";

export type Attributes = Partial<{
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
  attributes: Attributes & BodyComponent["attributes"];
  tagName: "mj-column";
}
