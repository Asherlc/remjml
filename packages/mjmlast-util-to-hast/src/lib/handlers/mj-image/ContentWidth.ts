import units, { Parts } from "units-css";
import { BoxWidth } from "../../helpers/BoxWidth";
import { minBy } from "lodash-es";
import { MjImageAttributes } from "mjmlast";

export class ContentWidth {
  #containerWidth: Parts;
  #attributes: MjImageAttributes;

  constructor(containerWidth: Parts, attributes: Record<string, string>) {
    this.#containerWidth = containerWidth;
    this.#attributes = attributes;
  }

  get #nodeWidth(): Parts {
    return this.#attributes.width
      ? units.parse(this.#attributes.width)
      : units.parse(Infinity);
  }

  get #boxWidth(): BoxWidth {
    return new BoxWidth(this.#attributes, this.#containerWidth);
  }

  get width(): Parts {
    const min = minBy<Parts>([this.#boxWidth.box, this.#nodeWidth], "value");

    if (typeof min === "undefined") {
      throw new Error(`No min value`);
    }

    return min;
  }

  toString(): string {
    return `${this.width.value}${this.width.unit}`;
  }
}
