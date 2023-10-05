// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import type { BorderValue, PaddingValue } from "./shorthandCss/types";
import { DirectionalShorthandCssProperties } from "./shorthandCss/DirectionalShorthandCssProperties";

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
  #attributes: Partial<BorderAttributes & PaddingAttributes>;
  #containerWidth: Parts;

  constructor(
    attributes: Partial<BorderAttributes & PaddingAttributes>,
    containerWidth: Parts
  ) {
    this.#containerWidth = containerWidth;
    this.#attributes = attributes;
  }

  get paddings(): number {
    const padding = new DirectionalShorthandCssProperties<PaddingValue>({
      top: this.#attributes["padding-top"],
      bottom: this.#attributes["padding-bottom"],
      left: this.#attributes["padding-left"],
      right: this.#attributes["padding-right"],
      full: this.#attributes.padding,
      name: "padding",
    });

    return (padding.right?.value || 0) + (padding.left?.value || 0);
  }

  get borders(): number {
    const border = new DirectionalShorthandCssProperties<BorderValue>({
      top: this.#attributes["border-top"],
      bottom: this.#attributes["border-bottom"],
      left: this.#attributes["border-left"],
      right: this.#attributes["border-right"],
      full: this.#attributes.border,
      name: "border",
    });

    const right: number =
      border.right === "none" ? 0 : border.right?.value || 0;
    const left: number = border.left === "none" ? 0 : border.left?.value || 0;

    return right + left;
  }

  get box(): Parts & { toString(): string } {
    const unit: Parts["unit"] = "px";
    const value: number =
      this.#containerWidth.value - this.paddings - this.borders;

    return {
      unit,
      value,
      toString(): string {
        return `${value}${unit}`;
      },
    };
  }
}
