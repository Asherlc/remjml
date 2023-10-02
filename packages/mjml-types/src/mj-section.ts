import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./mj-raw";
import type { BodyComponent } from "./BodyComponent";
import type { MjColumn } from "./mj-column";
import type { MjGroup } from "./mj-group";

export type Attributes = {
  "background-color": string;
  "background-url": string;
  "background-repeat": "repeat" | "no-repeat";
  "background-size": string;
  "background-position": string;
  "background-position-x": string;
  "background-position-y": string;
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  direction: "ltr" | "rtl";
  "full-width": "full-width" | "false";
  padding: string;
  "padding-top": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "text-align": string;
  "text-padding": string;
};

export interface MjSection extends BodyComponent, ParentComponent {
  tagName: "mj-section";
  attributes: Partial<Attributes>;
  children: (MjColumn | MjGroup | MjRaw)[];
}
