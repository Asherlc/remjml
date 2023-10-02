import { MjAccordionElement, MjRaw } from "mjmlast";
import { ParentComponent } from "./ParentComponent";
import { BodyComponent } from "./BodyComponent";

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

export interface MjAccordion extends BodyComponent, ParentComponent {
  tagName: "mj-accordion";
  attributes: Attributes;
  children: (MjAccordionElement | MjRaw)[];
}
