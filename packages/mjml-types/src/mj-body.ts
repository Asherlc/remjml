import { ParentComponent } from "./ParentComponent";
import { MjRaw } from "./mj-raw";
import { BodyComponent } from "./BodyComponent";
import { MjSection } from "./mj-section";
import { MjHero } from "./mj-hero";
import { MjWrapper } from "./mj-wrapper";

export interface MjBody extends BodyComponent, ParentComponent {
  attributes: BodyComponent["attributes"];
  children: [MjRaw | MjSection | MjWrapper | MjHero];
  tagName: "mj-body";
}
