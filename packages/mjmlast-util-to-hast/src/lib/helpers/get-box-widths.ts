import { borderParser, shorthandParser } from "../helpers/shorthand-parser";

function getShorthandAttrValue<Attributes extends Record<string, any>>(
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

function getShorthandBorderValue<Attributes extends Record<string, any>>(
  direction: string,
  attributes: Attributes
) {
  const borderDirection = direction && attributes[`border-${direction}`];
  const border = attributes["border"];

  return borderParser(borderDirection || border || "0");
}

export function getBoxWidths<Attributes extends {}>(
  attributes: Attributes,
  containerWidth: string
): {
  totalWidth: number;
  borders: number;
  paddings: number;
  box: number;
} {
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
