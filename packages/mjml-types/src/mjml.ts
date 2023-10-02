import { ParentComponent } from "./ParentComponent";
import { MjHead } from "./mj-head";
import { MjRaw } from "./mj-raw";
import { MjBody } from "./mj-body";

export type Attributes = Partial<{
  lang: string;
  dir: string;
}>;

export interface Mjml extends ParentComponent {
  attributes: Attributes;
  tagName: "mjml";
  children: [MjBody | MjHead | MjRaw];
}
