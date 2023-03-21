const unitRegex = /^(\d+)(px|%)$/;

export type Unit = "px" | "%";

function widthUnitIsValid(widthUnit: string | undefined): widthUnit is Unit {
  const units: Unit[] = ["px", "%"];

  return Boolean(widthUnit && units.includes(widthUnit as Unit));
}

const DEFAULT_UNIT: Unit = "px";

export class Width {
  #rawWidth: string | number;

  constructor(rawWidth: string | number) {
    if (typeof rawWidth === "string" && !unitRegex.test(rawWidth)) {
      throw new Error(`Invalid raw width ${rawWidth}`);
    }

    this.#rawWidth = rawWidth;
  }

  get unit(): Unit {
    if (typeof this.#rawWidth === "number") {
      return DEFAULT_UNIT;
    }

    const widthUnit = unitRegex.exec(this.#rawWidth)?.[2];

    if (!widthUnitIsValid(widthUnit)) {
      throw new Error(`Invalid width unit ${widthUnit}`);
    }

    return widthUnit;
  }

  get width(): number {
    if (typeof this.#rawWidth === "number") {
      return this.#rawWidth;
    }

    return parseInt(this.unit);
  }
}
