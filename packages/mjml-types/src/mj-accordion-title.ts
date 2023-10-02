import { BodyComponent } from "./BodyComponent";
import { EndComponent } from "./EndComponent";

type Attributes = {
  "background-color": string;
  color: string;
  "font-size": string;
  "font-family": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordionTitle extends BodyComponent, EndComponent {
  attributes: Attributes;
  tagName: "mj-accordion-title";
}
