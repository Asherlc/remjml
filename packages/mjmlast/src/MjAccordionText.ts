import type { BodyComponent } from "./BodyComponent";
import type { EndComponent } from "./EndComponent";

type MjAccordionTextAttributes = {
  "background-color": string;
  "font-size": string;
  "font-family": string;
  "font-weight": string;
  "letter-spacing": string;
  "line-height": string;
  color: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordionText extends EndComponent, BodyComponent {
  attributes: MjAccordionTextAttributes;
  type: "mj-accordion-text";
}
