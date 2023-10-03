import type { Element as HElement } from "hast";
import type { DisplayType } from "./types";
import { castArray } from "lodash-es";
import { u } from "unist-builder";
import { NON_IE_OPENING_SUFFIX, NON_IE_CLOSING_PREFIX } from "./constants";

export interface IConditionalComment {
  toAst(): HElement[];
}

export type ConditionalCommentConstructor = new (
  expression: string,
  childOrChildren: HElement | HElement[],
  display?: DisplayType
) => IConditionalComment;

export abstract class ConditionalComment implements IConditionalComment {
  protected expression: string;
  protected display?: DisplayType;
  #childOrChildren?: HElement | HElement[];

  constructor(
    expression: string,
    childOrChildren?: HElement | HElement[],
    display?: DisplayType
  ) {
    this.expression = expression;
    this.#childOrChildren = childOrChildren;
    this.display = display;
  }

  protected abstract beginString: string;
  protected abstract endString: string;

  get #children(): HElement[] {
    return this.#childOrChildren ? castArray(this.#childOrChildren) : [];
  }

  get begin(): HElement {
    let beginString: string = this.beginString;

    if (this.display === "non-ie") {
      beginString = `${beginString}${NON_IE_OPENING_SUFFIX}`;
    }

    return u("raw", beginString) as unknown as HElement;
  }

  get end(): HElement {
    let endString: string = this.endString;

    if (this.display === "non-ie") {
      endString = `${NON_IE_CLOSING_PREFIX}${endString}`;
    }

    return u("raw", endString) as unknown as HElement;
  }

  toAst(): HElement[] {
    return [this.begin, ...this.#children, this.end];
  }
}
