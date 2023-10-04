import type { EndComponent } from "./EndComponent";

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

export interface MjAccordionTitle extends EndComponent {
  attributes: Attributes;
  type: "mj-accordion-title";
}
