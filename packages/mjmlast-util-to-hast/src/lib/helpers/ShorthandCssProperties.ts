// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import { expandShorthandProperty } from "css-property-parser";
import units, { Parts } from "units-css";

export class ShorthandCssProperties {
  #left?: string;
  #right?: string;
  #top?: string;
  #bottom?: string;
  #full?: string;
  #propertyName: string;

  constructor({
    top,
    right,
    bottom,
    left,
    full,
    propertyName,
  }: {
    left?: string;
    right?: string;
    bottom?: string;
    top?: string;
    full?: string;
    propertyName: string;
  }) {
    this.#bottom = bottom;
    this.#left = left;
    this.#right = right;
    this.#top = top;
    this.#full = full;
    this.#propertyName = propertyName;
  }

  get top(): Parts {
    if (this.#top) {
      return units.parse(this.#top);
    }

    if (!this.#full || this.#full === "0") {
      return units.parse("0");
    }

    return units.parse(
      expandShorthandProperty(this.#propertyName, this.#full)[
        `${this.#propertyName}-top`
      ]
    );
  }

  get bottom(): Parts {
    if (this.#bottom) {
      return units.parse(this.#bottom);
    }

    if (!this.#full || this.#full === "0") {
      return units.parse("0");
    }

    return units.parse(
      expandShorthandProperty(this.#propertyName, this.#full)[
        `${this.#propertyName}-bottom`
      ]
    );
  }

  get left(): Parts {
    if (this.#left) {
      return units.parse(this.#left);
    }

    if (!this.#full || this.#full === "0") {
      return units.parse("0");
    }

    return units.parse(
      expandShorthandProperty(this.#propertyName, this.#full)[
        `${this.#propertyName}-left`
      ]
    );
  }

  get right(): Parts {
    if (this.#right) {
      return units.parse(this.#right);
    }

    if (!this.#full || this.#full === "0") {
      return units.parse("0");
    }

    const properties = expandShorthandProperty(this.#propertyName, this.#full);
    const expandedPropertyName = `${this.#propertyName}-right`;

    console.log(this.#full, properties, expandedPropertyName);
    const expandedProperty = properties[expandedPropertyName];

    return units.parse(expandedProperty);
  }
}

class ShorthandProperty {
  #name: string;
  #direction: string;
  #value?: string;

  constructor(name: string, direction: string, value: string | undefined) {
    this.#value = value;
    this.#name = name;
    this.#direction = direction;
  }

  get parts() {
    if (!this.#value || this.#value === "0") {
      return units.parse("0");
    }

    const properties = expandShorthandProperty(this.#name, this.#value);
    const expandedPropertyName = `${this.#name}-right`;

    console.log(this.#full, properties, expandedPropertyName);
    const expandedProperty = properties[expandedPropertyName];

    return units.parse(expandedProperty);
  }
}
