import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./MjRaw";
import type { MjAccordionElement } from "./MjAccordionElement";

type Attributes = {
  "container-background-color": string;
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
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordion extends ParentComponent, BodyComponent {
  attributes: Attributes;
  children: (MjAccordionElement | MjRaw)[];
  type: "mj-accordion";
}
