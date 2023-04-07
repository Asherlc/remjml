import { BoxWidth } from "./BoxWidth";

it("calculates the box width", () => {
  const containerWidth = { value: 600, unit: "px" };
  const attributes = {
    "padding-top": "0px",
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    padding: "20px 0",
  };

  const boxWidth = new BoxWidth(attributes, containerWidth);

  expect(boxWidth.box).toEqual({
    value: 600,
    unit: "px",
  });
});

it("calculates the box width prioritizing long values over conflicting shorthand value", () => {
  const containerWidth = { value: 600, unit: "px" };
  const attributes = {
    padding: "0px 25px",
    "font-size": "13px",
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    width: "780px",
  };
  const boxWidth = new BoxWidth(attributes, containerWidth);

  expect(boxWidth.box).toEqual(
    expect.objectContaining({
      value: 600,
      unit: "px",
    })
  );
});
