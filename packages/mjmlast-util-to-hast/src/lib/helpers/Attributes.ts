import { pick } from "lodash-es";
import type { MjClassesAttributes } from "../types";
import type { BaseAttributes } from "mjmlast";

export class Attributes {
  #mjClass: string | undefined;
  #attributes: BaseAttributes;
  #defaultAttributes: BaseAttributes;
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
    this.#attributes = attributes;
    this.#defaultAttributes = defaultAttributes;
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

  toHash() {
    return {
      // The order is critical!
      ...this.#defaultAttributes,
      ...this.#attributesFromMjClassesAttributes,
      ...this.#attributes,
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
