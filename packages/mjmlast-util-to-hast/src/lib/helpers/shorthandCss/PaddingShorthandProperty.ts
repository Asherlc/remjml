import { expandShorthandProperty } from "css-property-parser";
import units from "units-css";
import { NoPropertyError } from "./NoPropertyError";
import type { PaddingValue, ShorthandProperty } from "./types";

export class PaddingShorthandProperty
  implements ShorthandProperty<PaddingValue>
{
  #shorthandValue?: string;

  constructor(shorthandValue: string | undefined) {
    this.#shorthandValue = shorthandValue;
  }

  value(expandedValue: string | undefined, direction: string): PaddingValue {
    if (expandedValue) {
      return units.parse(expandedValue);
    }

    if (!this.#shorthandValue) {
      return undefined;
    }

    const properties = expandShorthandProperty("padding", this.#shorthandValue);

    const expandedPropertyName = `padding-${direction}`;

    const expandedProperty = properties[expandedPropertyName];

    if (!expandedProperty) {
      throw new NoPropertyError(expandedPropertyName);
    }

    return units.parse(expandedProperty);
  }
}
