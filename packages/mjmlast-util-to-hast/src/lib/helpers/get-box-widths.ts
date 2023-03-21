import {
  borderParser,
  Direction,
  shorthandParser,
} from "../helpers/shorthand-parser";
import { Width } from "./width-parser";

export function getShorthandAttrValue<Attributes extends Record<string, any>>(
  attribute: string,
  direction: Direction,
  attributes: Attributes
) {
  const mjAttributeDirection = attributes[`${attribute}-${direction}`];
  const mjAttribute = attributes[attribute];

  if (mjAttributeDirection) {
    return parseInt(mjAttributeDirection, 10);
  }

  if (!mjAttribute) {
    return 0;
  }

  return shorthandParser(mjAttribute, direction);
}

function getShorthandBorderValue<Attributes extends Record<string, any>>(
  direction: string,
  attributes: Attributes
) {
  const borderDirection = direction && attributes[`border-${direction}`];
  const border = attributes.border;

  return borderParser(borderDirection || border || "0");
}

export class BoxWidths<Attributes extends Record<string, any>> {
  #attributes: Attributes;
  #containerWidth: Width;

  constructor(attributes: Attributes, containerWidth: Width) {
    this.#attributes = attributes;
    this.#containerWidth = containerWidth;
  }

  get paddings(): number {
    return (
      getShorthandAttrValue("padding", "right", this.#attributes) +
      getShorthandAttrValue("padding", "left", this.#attributes)
    );
  }
  get borders(): number {
    return (
      getShorthandBorderValue("right", this.#attributes) +
      getShorthandBorderValue("left", this.#attributes)
    );
  }

  get box(): number {
    return this.#containerWidth.width - this.paddings - this.borders;
  }
}
