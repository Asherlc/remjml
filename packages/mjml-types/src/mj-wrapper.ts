import { MjSection } from "./mj-section";

export interface MjWrapper extends Omit<MjSection, "tagName"> {
  tagName: "mj-wrapper";
}
