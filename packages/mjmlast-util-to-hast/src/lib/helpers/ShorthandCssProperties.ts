// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import { expandShorthandProperty } from "css-property-parser";
import units, { Parts } from "units-css";

export type BorderValue = Parts | "none" | undefined;
export type PaddingValue = Parts | undefined;

type Value = PaddingValue | BorderValue;

interface ShorthandProperty<ValueType extends Value> {
  value(expandedValue: string | undefined, direction: string): ValueType;
}

interface IDirectionalCssProperty<ValueType> {
  left: ValueType | undefined;
  right: ValueType | undefined;
  top: ValueType | undefined;
  bottom: ValueType | undefined;
}

export class ShorthandCssProperties<ValueType extends Value>
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

export class StringifiableValue {
  #value: Parts | string;
  constructor(value: Parts | string) {
    this.#value = value;
  }

  toString(): string {
    if (typeof this.#value === "string") {
      return this.#value;
    }

    return `${this.#value.value}${this.#value.unit}`;
  }
}

class PaddingShorthandProperty implements ShorthandProperty<PaddingValue> {
  #shorthandValue?: string;

  constructor(shorthandValue: string | undefined) {
    this.#shorthandValue = shorthandValue;
  }

  value(expandedValue: string | undefined, direction: string): PaddingValue {
    if (!expandedValue || expandedValue === "0") {
      return units.parse("0");
    }

    if (!this.#shorthandValue) {
      return undefined;
    }

    const properties = expandShorthandProperty("padding", this.#shorthandValue);

    const expandedPropertyName = `padding-${direction}`;

    const expandedProperty = properties[expandedPropertyName];

    return units.parse(expandedProperty);
  }
}

class BorderShorthandProperty implements ShorthandProperty<BorderValue> {
  #shorthandValue?: string;

  constructor(shorthandValue: string | undefined) {
    this.#shorthandValue = shorthandValue;
  }

  value(expandedValue: string | undefined, direction: string): BorderValue {
    if (!expandedValue || expandedValue === "0") {
      return units.parse("0");
    }

    if (expandedValue === "none") {
      return "none";
    }

    if (!this.#shorthandValue) {
      return undefined;
    }

    const properties = expandShorthandProperty("border", this.#shorthandValue);
    const expandedPropertyName = `border-${direction}`;

    const expandedProperty = properties[expandedPropertyName];

    return units.parse(expandedProperty);
  }
}
