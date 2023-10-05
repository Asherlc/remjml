import { DirectionalShorthandCssProperties } from "./DirectionalShorthandCssProperties";

it("parses shorthand", () => {
  const properties = new DirectionalShorthandCssProperties({
    full: "0px 25px",
    bottom: undefined,
    left: undefined,
    right: undefined,
    name: "padding",
    top: undefined,
  });

  expect(properties.left).toEqual({ unit: "px", value: 25 });
  expect(properties.right).toEqual({ unit: "px", value: 25 });
});

it("prioritizes long properties over shorthand when in conflict", () => {
  const properties = new DirectionalShorthandCssProperties({
    full: "0px 25px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    name: "padding",
    top: undefined,
  });

  expect(properties.left).toEqual({ unit: "px", value: 0 });
  expect(properties.right).toEqual({ unit: "px", value: 0 });
});
