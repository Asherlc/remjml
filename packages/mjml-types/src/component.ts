import { UniversalAttributes } from "mjmlast";

export interface Component {
  readonly tagName: string;
  readonly attributes: UniversalAttributes & Record<string, string>;
}
