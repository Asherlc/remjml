import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./MjRaw";
import type { MjAccordionText } from "./MjAccordionText";
import type { MjAccordionTitle } from "./MjAccordionTitle";

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
  attributes: Attributes;
  children: (MjAccordionTitle | MjAccordionText | MjRaw)[];
  type: "mj-accordion-element";
}
