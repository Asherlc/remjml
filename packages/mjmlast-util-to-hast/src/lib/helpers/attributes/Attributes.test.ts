import { Attributes } from "./Attributes";

describe("when both the default attributes and specified attributes have padding", () => {
  it("only returns th specified padding", () => {
    const attributes = new Attributes({
      attributes: {
        "padding-top": "1px",
      },
      defaultAttributes: {
        padding: "10px 10px",
      },
      mjClass: undefined,
      mjClassesAttributes: {},
    });

    expect(attributes.get("padding")).toBeUndefined();
  });
});
