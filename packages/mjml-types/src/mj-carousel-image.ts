import { BodyComponent } from "./BodyComponent";
import { Component } from "./component";
import {} from "./UniversalAttributes";

export interface MjCarouselImage extends BodyComponent, Component {
  tagName: "mj-carousel-image";
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
}
