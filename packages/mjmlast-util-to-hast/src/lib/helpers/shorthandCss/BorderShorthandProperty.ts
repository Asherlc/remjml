import { expandShorthandProperty } from "css-property-parser";
import units from "units-css";
import type { ShorthandProperty, BorderValue } from "./types";
import { NoPropertyError } from "./NoPropertyError";

export class BorderShorthandProperty implements ShorthandProperty<BorderValue> {
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

    if (!expandedProperty) {
      throw new NoPropertyError(expandedPropertyName);
    }

    return units.parse(expandedProperty);
  }
}
