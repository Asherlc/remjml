import { AttributesHash } from "./AttributesHash";

describe("without", () => {
  describe("with an attribute", () => {
    it("excludes the attribute", () => {
      const attributesHash = new AttributesHash({
        padding: "1px",
      });

      expect(attributesHash.without(["padding"])).toBeTruthy();
    });
  });
});

describe("longhands", () => {
  it("returns the longhand attributes", () => {
    const attributesHash = new AttributesHash({
      "padding-top": "1px",
    });

    expect(attributesHash.longhands.attributes).toEqual({
      "padding-top": "1px",
    });
  });

  it("exclues the non-longhand attributes", () => {
    const attributesHash = new AttributesHash({
      padding: "10px",
    });

    expect(attributesHash.longhands.attributes).toEqual({});
  });
});
