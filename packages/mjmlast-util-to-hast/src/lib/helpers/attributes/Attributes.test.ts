import { Attributes } from "./Attributes";

describe("when both the default attributes and specified attributes have padding", () => {
  it("only returns the specified padding", () => {
    const attributes = new Attributes({
      attributes: {
        "padding-top": "1px",
      },
      defaultAttributes: {
        padding: "10px 10px",
      },
      mjClass: undefined,
      mjClassesAttributes: {},
      mjAllAttributes: {},
    });

    expect(attributes.get("padding")).toBeUndefined();
  });
});

describe("when both the default attributes and mj class attributes have padding", () => {
  it("only returns the mj class padding", () => {
    const attributes = new Attributes({
      attributes: {},
      defaultAttributes: {
        padding: "10px 10px",
      },
      mjClass: "less-padding",
      mjClassesAttributes: {
        "less-padding": {
          padding: "0px 20px",
        },
      },
      mjAllAttributes: {},
    });

    expect(attributes.get("padding")).toEqual("0px 20px");
  });
});
