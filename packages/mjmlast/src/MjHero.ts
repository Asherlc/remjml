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
import type { BodyComponent } from "./BodyComponent";

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

export interface MjHero extends ParentComponent, BodyComponent {
  attributes: Attributes;
  type: "mj-hero";
  children: Child[];
}
