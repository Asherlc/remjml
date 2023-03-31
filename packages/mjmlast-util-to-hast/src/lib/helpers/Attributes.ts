import { pick } from "lodash-es";

export class Attributes<AllowedAttributes> {
  #attributes: Partial<AllowedAttributes>;
  #defaultAttributes: Partial<AllowedAttributes>;
  // from mj-attributes
  #globalTypeAttributes: Partial<AllowedAttributes>;
  // from mj-all
  #globalAllAttributes: Partial<AllowedAttributes>;

  constructor(
    attributes: Partial<AllowedAttributes>,
    defaultAttributes: Partial<AllowedAttributes>,
    globalTypeAttributes: Partial<AllowedAttributes>,
    globalAllAttributes: Partial<AllowedAttributes>
  ) {
    this.#attributes = attributes;
    this.#defaultAttributes = defaultAttributes;
    this.#globalTypeAttributes = globalTypeAttributes;
    this.#globalAllAttributes = globalAllAttributes;
  }

  toHash() {
    return {
      // The order is critical!
      ...this.#defaultAttributes,
      ...this.#globalAllAttributes,
      ...this.#globalTypeAttributes,
      ...this.#attributes,
    };
  }

  get<P extends keyof AllowedAttributes>(
    propertyName: P
  ): Partial<AllowedAttributes>[P] {
    return this.toHash()[propertyName];
  }

  pick<P extends (keyof AllowedAttributes)[]>(
    ...propertyNames: P
  ): Record<P[number], Partial<AllowedAttributes>[P[number]]> {
    return pick(this.toHash(), propertyNames) as Record<
      P[number],
      Partial<AllowedAttributes>[P[number]]
    >;
  }
}
