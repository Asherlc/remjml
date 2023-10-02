import type { ParentComponent } from "./ParentComponent";
import type { MjHead } from "./mj-head";
import type { MjRaw } from "./mj-raw";
import type { MjBody } from "./mj-body";

export type Attributes = Partial<{
  lang: string;
  dir: string;
}>;

export interface Mjml extends ParentComponent {
  attributes: Attributes;
  tagName: "mjml";
  children: [MjBody | MjHead | MjRaw];
}
