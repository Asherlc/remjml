import { ContentWidth } from "./ContentWidth";

it("returns the given width when given width is smaller than the available space", () => {
  const width = new ContentWidth({ value: 600, unit: "px" }, { width: "50px" });

  expect(width.width).toEqual(
    expect.objectContaining({
      value: 50,
      unit: "px",
    })
  );
});

it("returns the given width when given width is smaller than the available space with different values", () => {
  const attributes = {
    padding: "0px 25px",
    "font-size": "13px",
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    width: "780px",
  };
  const width = new ContentWidth({ value: 600, unit: "px" }, attributes);

  expect(width.width).toEqual(
    expect.objectContaining({
      value: 600,
      unit: "px",
    })
  );
});
