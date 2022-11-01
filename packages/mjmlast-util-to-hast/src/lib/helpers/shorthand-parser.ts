export type Direction = "top" | "bottom" | "left" | "right";

export function shorthandParser(
  cssValue: string,
  direction: Direction
): number {
  const splittedCssValue = cssValue.split(" ");
  let directions: Record<Direction, number>;

  switch (splittedCssValue.length) {
    case 2:
      directions = { top: 0, bottom: 0, left: 1, right: 1 };
      break;

    case 3:
      directions = { top: 0, left: 1, right: 1, bottom: 2 };
      break;

    case 4:
      directions = { top: 0, right: 1, bottom: 2, left: 3 };
      break;
    case 1:
    default:
      return parseInt(cssValue, 10);
  }

  const directionNumber = directions[direction];
  const directionSegment = splittedCssValue[directionNumber];

  return directionSegment ? parseInt(directionSegment, 10) : 0;
}

export function borderParser(border: string): number {
  const matches = border.match(/(?:(?:^| )(\d+))/);
  // Not sure what this is... copied from original mjml
  const firstMatch = matches?.[1];
  return firstMatch ? parseInt(firstMatch, 10) : 0;
}
