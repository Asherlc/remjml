import type { ParentComponent } from "./ParentComponent";
import type { MjCarouselImage } from "./mj-carousel-image";
import type { BodyComponent } from "./BodyComponent";

type Attributes = {
  align: "left" | "right" | "center" | "justify";
  "border-radius": string;
  "container-background-color": string;
  "icon-width": string;
  "left-icon": string;
  padding: string;
  "padding-top": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "right-icon": string;
  thumbnails: "visible" | "hidden";
  "tb-border": string;
  "tb-border-radius": string;
  "tb-hover-border-color": string;
  "tb-selected-border-color": string;
  "tb-width": string;
};

export interface MjCarousel extends BodyComponent, ParentComponent {
  attributes: BodyComponent["attributes"] & Attributes;
  children: [MjCarouselImage];
  tagName: "mj-carousel";
}
