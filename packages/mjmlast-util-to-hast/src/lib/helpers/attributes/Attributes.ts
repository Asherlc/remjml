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

  constructor({
    attributes,
    defaultAttributes,
    mjClassesAttributes,
    mjClass,
  }: {
    attributes: BaseAttributes;
    defaultAttributes: BaseAttributes;
    mjClassesAttributes: MjClassesAttributes;
    mjClass: string | undefined;
  }) {
    this.#attributes = new AttributesHash(attributes);
    this.#defaultAttributes = new AttributesHash(defaultAttributes);
    this.#globalMjClassesAttributes = mjClassesAttributes;
    this.#mjClass = mjClass;
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
    const excludeFromDefaultAttributes: string[] =
      this.#attributesFromMjClassesAttributes.longhands.keys
        .flatMap(shorthandsFor)
        .concat(this.#attributesFromMjClassesAttributes.longhands.keys);

    const excludeFomDefaultAndMjClassesAttributes: string[] =
      this.#attributes.longhands.keys
        .flatMap(shorthandsFor)
        .concat(this.#attributes.longhands.keys);

    return {
      ...this.#defaultAttributes
        .without(excludeFromDefaultAttributes)
        .without(excludeFomDefaultAndMjClassesAttributes).attributes,
      ...this.#attributesFromMjClassesAttributes.without(
        this.#attributes.longhands
      ).attributes,
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
