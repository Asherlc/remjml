type Options = {
  parseFloatToInt?: boolean;
};

const unitRegex = /[\d.,]*(\D*)$/;

export default function widthParser(
  width: string | number,
  { parseFloatToInt }: Options = { parseFloatToInt: true }
): { parsedWidth: number; unit: string } {
  const widthString = width.toString();
  const widthUnit = unitRegex.exec(widthString)?.[1];
  const unitParsers = {
    default: parseInt,
    px: parseInt,
    "%": parseFloatToInt ? parseInt : parseFloat,
  };

  if (widthUnit && !unitParsers[widthUnit]) {
    throw new Error(`No matching parser for width unit ${widthUnit}`);
  }

  const parser = widthUnit ? unitParsers[widthUnit] : unitParsers.default;

  return {
    parsedWidth: parser(width),
    unit: widthUnit || "px",
  };
}
