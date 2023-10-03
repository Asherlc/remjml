import type { Element as HElement } from "hast";
import { u } from "unist-builder";
import { ConditionalComment } from "./ConditionalComment";

const END_STRING: string = `<![endif]>;`;

export class DownlevelRevealed extends ConditionalComment {
  protected get beginString(): string {
    return `<!--[if ${this.expression}]>`;
  }

  get end(): HElement {
    return u("raw", END_STRING) as unknown as HElement;
  }
}
