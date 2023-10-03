import { DownlevelRevealed } from "./DownlevelRevealed";

describe("when displaying not on IE", () => {
  describe("begin", () => {
    it("adds a <!-->", () => {
      const conditional = new DownlevelRevealed("true", [], "non-ie");

      expect(conditional.begin).toEqual({
        type: "raw",
        value: "<![if true]><!-->",
      });
    });
  });

  describe("end", () => {
    it("adds a <!--", () => {
      const conditional = new DownlevelRevealed("true", [], "non-ie");

      expect(conditional.end).toEqual({
        type: "raw",
        value: "<!--<![endif]>",
      });
    });
  });
});
