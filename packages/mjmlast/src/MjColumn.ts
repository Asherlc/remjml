import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjImage } from "./MjImage";
import type { MjSpacer } from "./MjSpacer";
import type { MjTable } from "./MjTable";
import type { MjRaw } from "./MjRaw";
import type { MjSocial } from "./MjSocial";
import type { MjNavbar } from "./MjNavbar";
import type { MjDivider } from "./MjDivider";
import type { MjCarousel } from "./MjCarousel";
import type { MjAccordion } from "./MjAccordion";
import type { MjButton } from "./MjButton";
import type { MjText } from "./MjText";

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
  mobileWidth?: string;
}>;

export type Child =
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

export interface MjColumn extends ParentComponent, BodyComponent {
  attributes: Attributes;
  type: "mj-column";
  children: Child[];
}
