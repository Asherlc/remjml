import type {
  Value,
  ShorthandProperty,
  IDirectionalCssProperty,
} from "./types";
import { BorderShorthandProperty } from "./BorderShorthandProperty";
import { PaddingShorthandProperty } from "./PaddingShorthandProperty";

export class DirectionalShorthandCssProperties<ValueType extends Value>
  implements IDirectionalCssProperty<ValueType>
{
  #left?: string;
  #right?: string;
  #top?: string;
  #bottom?: string;
  #shorthand?: string;
  #name: string;

  constructor({
    top,
    right,
    bottom,
    left,
    full,
    name,
  }: {
    left: string | undefined;
    right: string | undefined;
    bottom: string | undefined;
    top: string | undefined;
    full: string | undefined;
    name: string;
  }) {
    this.#bottom = bottom;
    this.#left = left;
    this.#right = right;
    this.#top = top;
    this.#shorthand = full;
    this.#name = name;
  }

  get #parser(): ShorthandProperty<ValueType> {
    if (this.#name === "padding") {
      return new PaddingShorthandProperty(
        this.#shorthand
      ) as ShorthandProperty<ValueType>;
    }

    if (this.#name === "border") {
      return new BorderShorthandProperty(
        this.#shorthand
      ) as ShorthandProperty<ValueType>;
    }

    throw new Error(`Invalid name ${this.#name}`);
  }

  get top(): ValueType | undefined {
    return this.#parser.value(this.#top, "top");
  }

  get bottom(): ValueType | undefined {
    return this.#parser.value(this.#bottom, "bottom");
  }

  get left(): ValueType | undefined {
    return this.#parser.value(this.#left, "left");
  }

  get right(): ValueType | undefined {
    return this.#parser.value(this.#right, "right");
  }
}
