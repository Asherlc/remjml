import type { UniversalAttributes } from "./UniversalAttributes";

export interface Component {
  readonly tagName: string;
  readonly attributes: UniversalAttributes & Record<string, string>;
}
