import { Properties } from "csstype";

type YPosition = "top" | "bottom" | "center";
type XPosition = "left" | "right" | "center";
type Position = XPosition | YPosition;

function isYPosition(value: string): value is YPosition {
  return ["center", "top", "bottom"].includes(value);
}

function isXPosition(value: string): value is XPosition {
  return ["center", "top", "bottom"].includes(value);
}

interface IBackgroundPosition {
  x: XPosition;
  y: YPosition;
}

class SingleValueBackgroundPosition implements IBackgroundPosition {
  // here we must determine if x or y was provided ; other will be center

  #value: Position;

  constructor(value: Position) {
    this.#value = value;
  }

  get #isVerticalValue(): boolean {
    return ["top", "bottom"].includes(this.#value);
  }

  get x(): XPosition {
    if (isYPosition(this.#value) && this.#isVerticalValue) {
      return "center";
    } else if (isXPosition(this.#value)) {
      return this.#value;
    }

    throw new Error(`Position is not a valid x`);
  }

  get y(): YPosition {
    if (isYPosition(this.#value) && this.#isVerticalValue) {
      return this.#value;
    } else if (isXPosition(this.#value)) {
      return "center";
    }

    throw new Error(`Position is not a valid y`);
  }
}

class DoubleValueBackgroundPosition implements IBackgroundPosition {
  #value1: Position;
  #value2: Position;
  constructor(value1: Position, value2: Position) {
    this.#value1 = value1;
    this.#value2 = value2;
  }

  get x(): XPosition {
    if (
      isYPosition(this.#value1) &&
      isXPosition(this.#value2) &&
      (["top", "bottom"].includes(this.#value1) ||
        (this.#value1 === "center" && ["left", "right"].includes(this.#value2)))
    ) {
      return this.#value2;
    } else if (isXPosition(this.#value1) && isYPosition(this.#value2)) {
      return this.#value1;
    }

    throw new Error(`Invalid x position`);
  }

  get y(): YPosition {
    if (
      isYPosition(this.#value1) &&
      isXPosition(this.#value2) &&
      (["top", "bottom"].includes(this.#value1) ||
        (this.#value1 === "center" && ["left", "right"].includes(this.#value2)))
    ) {
      return this.#value1;
    } else if (isXPosition(this.#value1) && isYPosition(this.#value2)) {
      return this.#value2;
    }

    throw new Error(`Invalid y position`);
  }
}

class BackgroundPositionString {
  #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  get #rawValues(): string[] {
    return this.#value.split(" ");
  }

  get position(): IBackgroundPosition {
    if (this.#rawValues.length === 1) {
      return new SingleValueBackgroundPosition(
        this.#value as XPosition | YPosition
      );
    } else if (this.#rawValues.length === 2) {
      return new DoubleValueBackgroundPosition(
        this.#rawValues[0] as Position,
        this.#rawValues[1] as Position
      );
    }

    throw new Error(`Invalid background count`);
  }
}

class BackgroundPosition {
  #position?: string;
  #x?: string;
  #y?: string;

  constructor({
    position,
    x,
    y,
  }: {
    position?: string;
    x?: string;
    y?: string;
  }) {
    const hasBothTypesOfPosition = position && typeof (x || y) !== "undefined";
    const hasOnlyOneCoord =
      !position && (typeof x === "undefined" || typeof y === "undefined");

    if (hasBothTypesOfPosition || hasOnlyOneCoord) {
      throw new Error(`Conflicting position values`);
    }

    this.#position = position;
    this.#x = x;
    this.#y = y;
  }

  get x(): XPosition {
    if (this.#x && this.#y && isXPosition(this.#x) && isYPosition(this.#y)) {
      return this.#x;
    }

    if (this.#position) {
      const backgroundPositionString = new BackgroundPositionString(
        this.#position
      );

      return backgroundPositionString.position.x;
    }

    throw new Error(`No background position`);
  }

  get y(): YPosition {
    if (this.#x && this.#y && isXPosition(this.#x) && isYPosition(this.#y)) {
      return this.#y;
    }

    if (this.#position) {
      const backgroundPositionString = new BackgroundPositionString(
        this.#position
      );

      return backgroundPositionString.position.y;
    }

    throw new Error(`No background position`);
  }
}

class YahooCompatibleBackground {
  #position: BackgroundPosition;
  #repeat?: string;
  #size?: string;
  #color?: string;
  #url?: string;

  constructor({
    position,
    repeat,
    size,
    color,
    url,
  }: {
    position: BackgroundPosition;
    repeat?: string;
    size?: string;
    color?: string;
    url?: string;
  }) {
    this.#position = position;
    this.#repeat = repeat;
    this.#size = size;
    this.#color = color;
    this.#url = url;
  }

  get #singleLine(): string {
    return [
      this.#color,
      ...(this.#url
        ? [
            `url('${this.#url}')`,
            `${this.#position.x} ${this.#position.y}`,
            `/ ${this.#size}`,
            this.#repeat,
          ]
        : []
      ).join(" "),
    ].join(" ");
  }

  get styles(): Properties {
    return this.#url
      ? {
          background: this.#singleLine,
          // background size, repeat and position has to be separate since yahoo does not support shorthand background css property
          "background-position": this.#position,
          "background-repeat": this.#repeat,
          "background-size": this.#size,
        }
      : {
          background: this.#color,
          "background-color": this.#color,
        };
  }
}

export class Background {
  url?: string;
  size?: string;
  repeat?: string;
  color?: string;
  #position?: string;
  #positionX?: string;
  #positionY?: string;

  constructor({
    url,
    size,
    repeat,
    color,
    position,
    positionY,
    positionX,
  }: {
    url?: string;
    size?: string;
    repeat?: string;
    color?: string;
    position?: string;
    positionY?: string;
    positionX?: string;
  }) {
    this.url = url;
    this.size = size;
    this.repeat = repeat;
    this.color = color;
    this.#position = position;
    this.#positionX = positionX;
    this.#positionY = positionY;
  }

  get position(): BackgroundPosition {
    return new BackgroundPosition({
      position: this.#position,
      x: this.#positionX,
      y: this.#positionY,
    });
  }

  toStyles(): Properties {
    return new YahooCompatibleBackground({
      position: this.position,
      repeat: this.repeat,
      size: this.size,
      color: this.color,
      url: this.url,
    }).styles;
  }
}
