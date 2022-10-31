import { get } from "lodash-es";

export function shorthandParser(cssValue: string, direction: string): number {
  const splittedCssValue = cssValue.split(" ");
  let directions = {};

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
  return parseInt(get(border.match(/(?:(?:^| )(\d+))/), 1), 10) || 0;
}
