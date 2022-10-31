import type { MjmlParent } from "mjmlast";
import { borderParser, shorthandParser } from "../helpers/shorthand-parser";

function getShorthandAttrValue<Attributes extends object>(
  attribute: string,
  direction: string,
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

function getShorthandBorderValue<Attributes extends object>(
  direction: string,
  attributes: Attributes
) {
  const borderDirection = direction && attributes[`border-${direction}`];
  const border = attributes["border"];

  return borderParser(borderDirection || border || "0");
}

export function getBoxWidths<Attributes extends {}>(
  attributes: Attributes,
  parent: MjmlParent
): {
  totalWidth: number;
  borders: number;
  paddings: number;
  box: number;
} {
  const { containerWidth } = parent.attributes["width"];
  const parsedWidth = parseInt(containerWidth, 10);

  const paddings =
    getShorthandAttrValue("padding", "right", attributes) +
    getShorthandAttrValue("padding", "left", attributes);

  const borders =
    getShorthandBorderValue("right", attributes) +
    getShorthandBorderValue("left", attributes);

  return {
    totalWidth: parsedWidth,
    borders,
    paddings,
    box: parsedWidth - paddings - borders,
  };
}
