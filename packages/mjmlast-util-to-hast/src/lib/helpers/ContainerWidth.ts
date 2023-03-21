import { Unit, Width } from "./width-parser";
import { MjColumnAttributes } from "mjmlast";
import { BoxWidths, getShorthandAttrValue } from "./get-box-widths";

export class ContainerWidth {
  #attributes: MjColumnAttributes;
  #parentWidth: Width;
  #nonRawSiblingsCount: number;

  constructor({
    attributes,
    parentWidth,
    nonRawSiblingCount: nonRawSiblingsCount,
  }: {
    attributes: MjColumnAttributes;
    parentWidth: Width;
    nonRawSiblingCount: number;
  }) {
    this.#attributes = attributes;
    this.#nonRawSiblingsCount = nonRawSiblingsCount;
    this.#parentWidth = parentWidth;
  }

  get #boxWidths(): {
    borders: number;
    paddings: number;
    box: number;
  } {
    return new BoxWidths(this.#attributes, this.#parentWidth);
  }

  get #innerBorders(): number {
    return (
      getShorthandAttrValue("inner-border", "left", this.#attributes) +
      getShorthandAttrValue("inner-border", "right", this.#attributes)
    );
  }

  get #allPaddings() {
    return (
      this.#boxWidths.paddings + this.#boxWidths.borders + this.#innerBorders
    );
  }

  get #totalWidth(): {
    unit: Unit;
    width: number;
  } {
    if (this.#attributes.width) {
      return new Width(this.#attributes.width);
    } else if (this.#nonRawSiblingsCount === 0) {
      return this.#parentWidth;
    }

    return {
      unit: this.#parentWidth.unit,
      width: this.#parentWidth.width / this.#nonRawSiblingsCount,
    };
  }

  get widthMinusPaddings(): {
    width: number;
    unit: Unit;
  } {
    const { unit, width } = this.#totalWidth;

    if (unit === "%") {
      return {
        width: (this.#parentWidth.width * width) / 100 - this.#allPaddings,
        unit: "px",
      };
    }
    return {
      width: width - this.#allPaddings,
      unit: "px",
    };
  }
}
