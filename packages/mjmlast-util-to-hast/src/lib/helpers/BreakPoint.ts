// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units from "units-css";
import type { Parts } from "units-css";

// MJML only supports px-based breakpoints
export class Breakpoint {
  #px: string;

  constructor(px: string) {
    this.#px = px;
  }

  get lower(): Parts {
    const { value, unit } = units.parse(this.#px);

    return { value: value - 1, unit };
  }
}
