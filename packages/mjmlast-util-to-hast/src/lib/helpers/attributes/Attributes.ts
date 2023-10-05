import { pick } from "lodash-es";
import type { MjClassesAttributes } from "../../types";
import type { BaseAttributes } from "mjmlast";
import { AttributesHash } from "./AttributesHash";
import { shorthandsFor } from "./shorthand-properties";

export class Attributes {
  #mjClass: string | undefined;
  #attributes: AttributesHash;
  #defaultAttributes: AttributesHash;
  #globalMjClassesAttributes: MjClassesAttributes;
  #globalMjAllAttributes: BaseAttributes;

  constructor({
    attributes,
    defaultAttributes,
    mjClassesAttributes,
    mjClass,
    mjAllAttributes,
  }: {
    attributes: BaseAttributes;
    defaultAttributes: BaseAttributes;
    mjClassesAttributes: MjClassesAttributes;
    mjClass: string | undefined;
    mjAllAttributes: BaseAttributes;
  }) {
    this.#attributes = new AttributesHash(attributes);
    this.#defaultAttributes = new AttributesHash(defaultAttributes);
    this.#globalMjClassesAttributes = mjClassesAttributes;
    this.#mjClass = mjClass;
    this.#globalMjAllAttributes = mjAllAttributes;
  }

  get #mjClasses(): string[] {
    return this.#mjClass?.split(" ") || [];
  }

  get #attributesFromMjClassesAttributes(): AttributesHash {
    const rawAttributes: BaseAttributes = this.#mjClasses.reduce(
      (accumulator: BaseAttributes, mjClass: string): BaseAttributes => {
        const attributes: BaseAttributes | undefined =
          this.#globalMjClassesAttributes[mjClass];

        return {
          ...(attributes || {}),
          ...accumulator,
        };
      },
      {}
    );

    return new AttributesHash(rawAttributes);
  }

  toHash(): BaseAttributes {
    // Please don't blame me for this, just trying to replicate mjml based on observed behavior
    const excludeFromDefaultAttributes: string[] =
      this.#attributesFromMjClassesAttributes.longhands.keys
        .flatMap(shorthandsFor)
        .concat(this.#attributesFromMjClassesAttributes.longhands.keys);

    // This order is crucial
    return {
      ...this.#defaultAttributes.without(excludeFromDefaultAttributes)
        .attributes,
      ...this.#globalMjAllAttributes,
      ...this.#attributesFromMjClassesAttributes.attributes,
      ...this.#attributes.attributes,
    };
  }

  get(propertyName: string): BaseAttributes[string] | undefined {
    return this.toHash()[propertyName];
  }

  pick<P extends string>(
    ...propertyNames: P[]
  ): Partial<Record<P[number], BaseAttributes[P[number]]>> {
    return pick(this.toHash(), propertyNames) as Record<
      P[number],
      BaseAttributes[P[number]]
    >;
  }
}
