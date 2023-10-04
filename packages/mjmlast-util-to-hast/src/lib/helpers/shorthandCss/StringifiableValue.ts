import type { Parts } from "units-css";

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
