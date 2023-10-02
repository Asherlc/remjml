import type { Element as HElement } from "hast";
import { NON_IE } from "./constants";
import { u } from "unist-builder";
import { ConditionalComment } from "./ConditionalComment";

const END_STRING: string = "<![endif]-->;";

export class DownlevelHidden extends ConditionalComment {
  protected get beginString(): string {
    const conditionalComment = `<!--[if !${this.expression}]>`;

    if (this.display === "non-ie") {
      return `${conditionalComment}${NON_IE}`;
    }

    return conditionalComment;
  }

  protected get end(): HElement {
    return u("raw", END_STRING) as unknown as HElement;
  }
}
