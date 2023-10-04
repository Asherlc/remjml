import type { Parts } from "units-css";
import units from "units-css";
import { BoxWidth } from "../../helpers/BoxWidth";
import { minBy } from "lodash-es";
import type { BaseAttributes } from "mjmlast";

export class ContentWidth {
  #containerWidth: Parts;
  #attributes: BaseAttributes;

  constructor(containerWidth: Parts, attributes: BaseAttributes) {
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
