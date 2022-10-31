type Options = {
  parseFloatToInt?: boolean;
};

const unitRegex = /[\d.,]*(\D*)$/;

type Unit = "px" | "%";

function widthUnitIsValid(widthUnit: string | undefined): widthUnit is Unit {
  const units: Unit[] = ["px", "%"];

  return Boolean(widthUnit && units.includes(widthUnit as Unit));
}

const DEFAULT_UNIT: Unit = "px";

export default function widthParser(
  width: string | number,
  { parseFloatToInt }: Options = { parseFloatToInt: true }
): { parsedWidth: number; unit: string } {
  if (typeof width === "number") {
    return {
      parsedWidth: width,
      unit: DEFAULT_UNIT,
    };
  }

  const widthString = width.toString();
  const widthUnit = unitRegex.exec(widthString)?.[1];
  const unitParsers = {
    px: parseInt,
    "%": parseFloatToInt ? parseInt : parseFloat,
  };

  if (widthUnit && !widthUnitIsValid(widthUnit)) {
    throw new Error(`No matching parser for width unit ${widthUnit}`);
  }

  const parser = widthUnit ? unitParsers[widthUnit as Unit] : parseInt;

  return {
    parsedWidth: parser(width),
    unit: widthUnit || DEFAULT_UNIT,
  };
}
