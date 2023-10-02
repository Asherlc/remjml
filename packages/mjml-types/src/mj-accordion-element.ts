import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./mj-raw";
import type { MjAccordionText } from "./mj-accordion-text";
import type { MjAccordionTitle } from "./mj-accordion-title";
import type { BodyComponent } from "./BodyComponent";

type Attributes = {
  "background-color": string;
  border: string;
  "font-family": string;
  "icon-align": "top" | "middle" | "bottom";
  "icon-width": string;
  "icon-height": string;
  "icon-wrapped-url": string;
  "icon-wrapped-alt": string;
  "icon-unwrapped-url": string;
  "icon-unwrapped-alt": string;
  "icon-position": "left" | "right";
};

export interface MjAccordionElement extends ParentComponent, BodyComponent {
  tagName: "mj-accordion-element";
  attributes: Attributes;
  children: (MjAccordionTitle | MjAccordionText | MjRaw)[];
}
