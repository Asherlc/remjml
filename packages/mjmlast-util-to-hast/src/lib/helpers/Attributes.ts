import { pick } from "lodash-es";

export class Attributes<AllowedAttributes> {
  #attributes: AllowedAttributes;
  #defaultAttributes: Partial<AllowedAttributes>;
  // from mj-attributes
  #globalTypeAttributes: Partial<AllowedAttributes>;
  // from mj-all
  #globalAllAttributes: Partial<AllowedAttributes>;

  constructor(
    attributes: AllowedAttributes,
    defaultAttributes: Partial<AllowedAttributes>,
    globalTypeAttributes: Partial<AllowedAttributes>,
    globalAllAttributes: Partial<AllowedAttributes>
  ) {
    this.#attributes = attributes;
    this.#defaultAttributes = defaultAttributes;
    this.#globalTypeAttributes = globalTypeAttributes;
    this.#globalAllAttributes = globalAllAttributes;
  }

  get #allAttributes() {
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
  ): AllowedAttributes[P] {
    return this.#allAttributes[propertyName];
  }

  pick<P extends (keyof AllowedAttributes)[]>(
    ...propertyNames: P
  ): Record<P[number], AllowedAttributes[P[number]]> {
    return pick(this.#allAttributes, propertyNames);
  }
}
