import { DownlevelHidden } from "./DownlevelHidden";

describe("when displaying not on IE", () => {
  describe("begin", () => {
    it("adds a <!-->", () => {
      const conditional = new DownlevelHidden("true", [], "non-ie");

      expect(conditional.begin).toEqual({
        type: "raw",
        value: "<!--[if true]><!-->",
      });
    });
  });

  describe("end", () => {
    it("returns a node", () => {
      const conditional = new DownlevelHidden("true", [], "non-ie");

      expect(conditional.end).toEqual({
        type: "raw",
        value: "<!--<![endif]-->",
      });
    });
  });
});
