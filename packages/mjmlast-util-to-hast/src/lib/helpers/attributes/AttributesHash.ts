import { omit, pickBy } from "lodash-es";
import type { BaseAttributes } from "mjmlast";
import { isLonghand } from "./shorthand-properties";

export class AttributesHash {
  attributes: BaseAttributes;

  constructor(attributes: BaseAttributes) {
    this.attributes = attributes;
  }

  without(attributes: AttributesHash | string[]): AttributesHash {
    if (Array.isArray(attributes)) {
      return new AttributesHash(omit(this.attributes, attributes));
    }

    return new AttributesHash(
      omit(this.attributes, Object.keys(attributes.attributes))
    );
  }

  get longhands(): AttributesHash {
    const attributes = pickBy(
      this.attributes,
      (_value: string | number, key: string): boolean => {
        return isLonghand(key);
      }
    );

    return new AttributesHash(attributes);
  }

  get keys(): string[] {
    return Object.keys(this.attributes);
  }
}
