import type { BodyComponent } from "./BodyComponent";
import type { ParentComponent } from "./ParentComponent";
import type { MjRaw } from "./MjRaw";
import type { MjHero } from "./MjHero";
import type { MjWrapper } from "./MjWrapper";
import type { MjSection } from "./MjSection";

export type Attributes = Partial<{
  width: string;
  "background-color": string;
}>;

export interface MjBody extends ParentComponent, BodyComponent {
  attributes: Attributes & BodyComponent["attributes"];
  type: "mj-body";
  /* eslint-disable-next-line no-use-before-define */
  children: (MjRaw | MjSection | MjWrapper | MjHero)[];
}
