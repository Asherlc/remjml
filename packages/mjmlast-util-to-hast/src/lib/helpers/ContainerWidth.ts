// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units, { Parts } from "units-css";
import { MjColumnAttributes } from "mjmlast";
import { BoxWidth } from "./BoxWidth";
import { ShorthandCssProperties } from "./ShorthandCssProperties";
import { Attributes } from "./Attributes";

export class ContainerWidth {
  #attributes: Attributes<MjColumnAttributes>;
  #parentWidth: Parts;
  #nonRawSiblingsCount: number;

  constructor({
    attributes,
    parentWidth,
    nonRawSiblingCount: nonRawSiblingsCount,
  }: {
    attributes: Attributes<MjColumnAttributes>;
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
      top: this.#attributes.get("border-top"),
      bottom: this.#attributes.get("border-bottom"),
      left: this.#attributes.get("border-left"),
      right: this.#attributes.get("border-right"),
      full: this.#attributes.get("border"),
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
