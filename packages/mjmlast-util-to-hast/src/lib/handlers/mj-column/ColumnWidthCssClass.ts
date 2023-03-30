import units, { Parts } from "units-css";
import { Node } from "unist";
import { is } from "unist-util-is";
import { ColumnParent } from "./types";

const PREFIX_PIXEL = "mj-column-px";
const PREFIX_PERCENT = "mj-column-per";

const UNIT_TO_PREFIX_MAP: Record<string, string> = {
  "%": PREFIX_PERCENT,
  px: PREFIX_PIXEL,
};

export class ColumnWidthCssClass {
  #widthAttributeValue?: string;
  #parent: ColumnParent;

  constructor(widthAttributeValue: string | undefined, parent: ColumnParent) {
    this.#widthAttributeValue = widthAttributeValue;
    this.#parent = parent;
  }

  get #nonRawSiblings(): Node[] {
    return this.#parent.children.filter((sibling) => !is(sibling, "raw"));
  }

  get width(): Parts {
    if (this.#widthAttributeValue) {
      return units.parse(this.#widthAttributeValue);
    }

    return {
      value: 100 / this.#nonRawSiblings.length,
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
