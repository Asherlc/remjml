import units from "units-css";
import type { Attributes } from "../../helpers/Attributes";
import type { MjColumnAttributes, MjGroup, MjSection } from "mjmlast";
import { ContainerWidth } from "../../helpers/ContainerWidth";
import type { Node } from "unist";
import { is } from "unist-util-is";

type ColumnParent = MjGroup | MjSection;

export class ColumnContainerWidth {
  #parentWidth: string;
  #parent: ColumnParent;
  #attributes: Attributes<MjColumnAttributes>;

  constructor(
    parentWidth: string,
    parent: ColumnParent,
    attributes: Attributes<MjColumnAttributes>
  ) {
    this.#parentWidth = parentWidth;
    this.#parent = parent;
    this.#attributes = attributes;
  }

  get #nonRawSiblings(): Node[] {
    return this.#parent.children.filter((sibling) => is(sibling, "element"));
  }

  get #containerWidth(): ContainerWidth {
    return new ContainerWidth({
      attributes: this.#attributes,
      parentWidth: units.parse(this.#parentWidth),
      nonRawSiblingCount: this.#nonRawSiblings.length,
    });
  }

  toString(): string {
    const { value: width, unit } = this.#containerWidth.widthMinusPaddings;

    return `${width}${unit}`;
  }
}
