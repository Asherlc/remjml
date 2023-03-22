import { Attributes } from "./Attributes";
import { Width } from "./Width";

export class BoxWidths {
  #attributes: Attributes;
  #containerWidth: Width;

  constructor(attributes: Record<string, string>, containerWidth: Width) {
    this.#attributes = new Attributes(attributes);
    this.#containerWidth = containerWidth;
  }

  get paddings(): number {
    return (
      this.#attributes.getShorthandValue("padding", "right") +
      this.#attributes.getShorthandValue("padding", "left")
    );
  }

  get borders(): number {
    return (
      this.#attributes.getShorthandBorderValue("right") +
      this.#attributes.getShorthandBorderValue("left")
    );
  }

  get box(): number {
    return this.#containerWidth.width - this.paddings - this.borders;
  }
}
