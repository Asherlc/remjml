import { ContentWidth } from "./ContentWidth";

it("returns the given width when given width is smaller than the available space", () => {
  const width = new ContentWidth({ value: 600, unit: "px" }, { width: "50px" });

  expect(width.width).toEqual({
    value: 50,
    unit: "px",
  });
});
