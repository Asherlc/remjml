import { pick } from "lodash-es";
import type { MjClassesAttributes } from "../../types";
import type { BaseAttributes } from "mjmlast";
import { AttributesHash } from "./AttributesHash";

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

  get #attributesFromMjClassesAttributes(): BaseAttributes {
    return this.#mjClasses.reduce(
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
  }

  toHash(): BaseAttributes {
    return {
      // The order is critical!
      ...(this.#attributes.hasPadding
        ? this.#defaultAttributes.withoutPadding.attributes
        : this.#defaultAttributes.attributes),
      ...this.#attributesFromMjClassesAttributes,
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
