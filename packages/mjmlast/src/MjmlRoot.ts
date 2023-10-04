import type { ParentComponent } from "./ParentComponent";
import type { MjHead } from "./MjHead";
import type { MjRaw } from "./MjRaw";
import type { MjBody } from "./MjBody";

export type Attributes = Partial<{
  owa: string;
  lang: string;
  dir: string;
}>;

export interface MjmlRoot extends ParentComponent {
  attributes: Attributes;
  type: "mjml";
  children: (MjBody | MjHead | MjRaw)[];
}
