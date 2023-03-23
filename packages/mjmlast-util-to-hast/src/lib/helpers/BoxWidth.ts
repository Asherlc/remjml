// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import { Parts } from "units-css";
import { ShorthandCssProperties } from "./ShorthandCssProperties";

type BorderAttributes = {
  "border-top"?: string;
  "border-bottom"?: string;
  "border-left"?: string;
  "border-right"?: string;
  border?: string;
};

type PaddingAttributes = {
  "padding-top"?: string;
  "padding-bottom"?: string;
  "padding-left"?: string;
  "padding-right"?: string;
  padding?: string;
};

export class BoxWidth {
  #attributes: BorderAttributes & PaddingAttributes;
  #containerWidth: Parts;

  constructor(
    attributes: BorderAttributes & PaddingAttributes,
    containerWidth: Parts
  ) {
    this.#containerWidth = containerWidth;
    this.#attributes = attributes;
  }

  get paddings(): number {
    const padding = new ShorthandCssProperties<Parts>({
      top: this.#attributes["padding-top"],
      bottom: this.#attributes["padding-bottom"],
      left: this.#attributes["padding-left"],
      right: this.#attributes["padding-right"],
      full: this.#attributes["padding"],
      name: "padding",
    });

    return padding.right.value + padding.left.value;
  }

  get borders(): number {
    const border = new ShorthandCssProperties<Parts>({
      top: this.#attributes["border-top"],
      bottom: this.#attributes["border-bottom"],
      left: this.#attributes["border-left"],
      right: this.#attributes["border-right"],
      full: this.#attributes["border"],
      name: "border",
    });

    return border.right.value + border.left.value;
  }

  get box(): Parts {
    const unit: Parts["unit"] = "px";
    const value: number =
      this.#containerWidth.value - this.paddings - this.borders;

    return {
      unit,
      value,
    };
  }
}
