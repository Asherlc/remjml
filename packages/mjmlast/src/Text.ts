import type { Literal } from "unist";

export interface Text extends Literal {
  type: "text";
  value: string;
}
