import { ParentComponent } from "./ParentComponent";
import { Component } from "./component";
import { MjImage } from "./mj-image";
import { MjSpacer } from "./mj-spacer";
import { MjTable } from "./mj-table";
import { MjRaw } from "./mj-raw";
import { MjSocial } from "./mj-social";
import { MjNavbar } from "./mj-navbar";
import { MjDivider } from "./mj-divider";
import { MjCarousel } from "./mj-carousel";
import { MjButton } from "./mj-button";
import { MjText } from "./mj-text";

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
