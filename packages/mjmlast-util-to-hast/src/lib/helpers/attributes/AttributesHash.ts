import { omit } from "lodash-es";
import type { BaseAttributes } from "mjmlast";

export class AttributesHash {
  attributes: BaseAttributes;

  constructor(attributes: BaseAttributes) {
    this.attributes = attributes;
  }

  get hasPadding(): boolean {
    return Boolean(
      this.attributes.padding ||
        this.attributes["padding-left"] ||
        this.attributes["padding-right"] ||
        this.attributes["padding-bottom"] ||
        this.attributes["padding-top"] ||
        this.attributes.padding
    );
  }

  get withoutPadding(): AttributesHash {
    return new AttributesHash(
      omit(
        this.attributes,
        "padding-left",
        "padding-right",
        "padding-top",
        "padding-bottom",
        "padding"
      )
    );
  }
}
