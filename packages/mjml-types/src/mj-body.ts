import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./mj-raw";
import type { BodyComponent } from "./BodyComponent";
import type { MjSection } from "./mj-section";
import type { MjHero } from "./mj-hero";
import type { MjWrapper } from "./mj-wrapper";

export interface MjBody extends BodyComponent, ParentComponent {
  attributes: BodyComponent["attributes"];
  children: [MjRaw | MjSection | MjWrapper | MjHero];
  tagName: "mj-body";
}
