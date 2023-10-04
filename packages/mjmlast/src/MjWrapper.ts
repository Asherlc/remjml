import type { MjSection } from "./MjSection";

export interface MjWrapper extends Omit<MjSection, "type"> {
  type: "mj-wrapper";
}
