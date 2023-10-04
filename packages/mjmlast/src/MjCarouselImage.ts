import type { Component } from "./Component";

export interface MjCarouselImage extends Component {
  attributes: {
    alt: string;
    href: string;
    rel: string;
    target: string;
    title: string;
    src: string;
    "thumbnails-src": string;
    "border-radius": string;
    "tb-border": string;
    "tb-border-radius": string;
  };
  type: "mj-carousel-image";
}
