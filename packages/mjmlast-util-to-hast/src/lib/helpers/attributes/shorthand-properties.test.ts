import { isLonghand, shorthandsFor } from "./shorthand-properties";

describe("shorthandsFor", () => {
  it("returns the shorthands for a regular longhand property", () => {
    expect(shorthandsFor("border-color")).toEqual(["border"]);
  });

  it("returns the shorthands for a second-level longhand property", () => {
    expect(shorthandsFor("border-top-color")).toEqual([
      "border",
      "border-color",
      "border-top",
    ]);
  });

  describe("first level longhand", () => {
    it.each([{ longhand: "padding-top", shorthands: ["padding"] }])(
      "returns $shorthands for property $longhand",
      ({ longhand, shorthands }) => {
        expect(shorthandsFor(longhand)).toEqual(shorthands);
      }
    );
  });
});

describe("isLonghand", () => {
  describe("first level longhand", () => {
    it.each(["padding-top"])("returns %s property", (property) => {
      expect(isLonghand(property)).toBeTruthy();
    });
  });
});
