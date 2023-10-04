import { AttributesHash } from "./AttributesHash";

describe("hasPadding", () => {
  describe("with padding", () => {
    it("returns true", () => {
      const attributesHash = new AttributesHash({
        "padding-top": "1px",
      });

      expect(attributesHash.hasPadding).toBeTruthy();
    });
  });
});

describe("withoutPadding", () => {
  describe("with padding", () => {
    it("returns a new hash with no padding", () => {
      const attributesHash = new AttributesHash({
        "padding-top": "1px",
      });

      expect(attributesHash.withoutPadding.attributes).toEqual({});
    });
  });
});
