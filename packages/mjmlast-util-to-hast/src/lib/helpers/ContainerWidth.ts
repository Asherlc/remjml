// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import units from "units-css";
import { BoxWidth } from "./BoxWidth";
import { ShorthandCssProperties } from "./ShorthandCssProperties";
import type { Attributes } from "./Attributes";

export class ContainerWidth {
  #attributes: Attributes;
  #parentWidth: Parts;
  #nonRawSiblingsCount: number;

  constructor({
    attributes,
    parentWidth,
    nonRawSiblingCount: nonRawSiblingsCount,
  }: {
    attributes: Attributes;
    parentWidth: Parts;
    nonRawSiblingCount: number;
  }) {
    this.#attributes = attributes;
    this.#nonRawSiblingsCount = nonRawSiblingsCount;
    this.#parentWidth = parentWidth;
  }

  get #boxWidths(): BoxWidth {
    return new BoxWidth(
      this.#attributes.pick(
        "padding-top",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding",
        "border-top",
        "border-bottom",
        "border-left",
        "border-right",
        "border"
      ),
      this.#parentWidth
    );
  }

  get #innerBorders(): number {
    const border = new ShorthandCssProperties<Parts>({
      top: this.#attributes.get("border-top")?.toString(),
      bottom: this.#attributes.get("border-bottom")?.toString(),
      left: this.#attributes.get("border-left")?.toString(),
      right: this.#attributes.get("border-right")?.toString(),
      full: this.#attributes.get("border")?.toString(),
      name: "border",
    });

    return (border.left?.value || 0) + (border.right?.value || 0);
  }

  get #allPaddings() {
    return (
      this.#boxWidths.paddings + this.#boxWidths.borders + this.#innerBorders
    );
  }

  get #totalWidth(): Parts {
    const width = this.#attributes.get("width");

    if (width) {
      return units.parse(width);
    } else if (this.#nonRawSiblingsCount === 0) {
      return this.#parentWidth;
    }

    return {
      unit: this.#parentWidth.unit,
      value: this.#parentWidth.value / this.#nonRawSiblingsCount,
    };
  }

  get widthMinusPaddings(): Parts {
    const { unit, value: width } = this.#totalWidth;

    if (unit === "%") {
      return {
        value: (this.#parentWidth.value * width) / 100 - this.#allPaddings,
        unit: "px",
      };
    }
    return {
      value: width - this.#allPaddings,
      unit: "px",
    };
  }
}
