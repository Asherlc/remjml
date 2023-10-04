import type { Parts } from "units-css";
import units from "units-css";
import type { Node } from "unist";
import { is } from "unist-util-is";
import { whitespace } from "hast-util-whitespace";
import type { Parent } from "mjmlast";
import { isText } from "mjmlast";

const PREFIX_PIXEL = "mj-column-px";
const PREFIX_PERCENT = "mj-column-per";

const UNIT_TO_PREFIX_MAP: Record<string, string> = {
  "%": PREFIX_PERCENT,
  px: PREFIX_PIXEL,
};

export class ColumnWidthCssClass {
  #widthAttributeValue?: string;
  #parent: Parent;

  constructor(widthAttributeValue: string | undefined, parent: Parent) {
    this.#widthAttributeValue = widthAttributeValue;
    this.#parent = parent;
  }

  get #siblingsWithControlledWidths(): Node[] {
    return this.#parent.children.filter((sibling) => {
      const isRaw: boolean = is(sibling, "raw");

      if (isRaw) {
        return false;
      }

      if (isText(sibling)) {
        return !whitespace(sibling);
      }

      return true;
    });
  }

  get width(): Parts {
    if (this.#widthAttributeValue) {
      return units.parse(this.#widthAttributeValue);
    }

    return {
      value: 100 / this.#siblingsWithControlledWidths.length,
      unit: "%",
    };
  }

  toString(): string {
    const { value, unit } = this.width;

    const formattedClassNb = value.toString().replace(".", "-");
    const prefix = UNIT_TO_PREFIX_MAP[unit];

    return [prefix, formattedClassNb].join("-");
  }
}
