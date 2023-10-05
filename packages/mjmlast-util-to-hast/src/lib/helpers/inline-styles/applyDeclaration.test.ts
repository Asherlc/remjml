import type css from "css";
import { applyDeclaration } from "./applyDeclaration";

describe("when there is no style attribute on the element", () => {
  it("appends the declaration", () => {
    const declaration: css.Declaration = {
      property: "background-color",
      value: "black",
    };

    const declarations: css.Declaration[] = applyDeclaration([], declaration);

    expect(declarations).toEqual([declaration]);
  });
});

describe("when there is a style attribute on the element", () => {
  it("appends the declaration", () => {
    const declaration: css.Declaration = {
      property: "background-color",
      value: "black",
    };

    const existingDeclarations: css.Declaration[] = [
      {
        property: "border-color",
        value: "white",
      },
    ];

    const declarations: css.Declaration[] = applyDeclaration(
      existingDeclarations,
      declaration
    );

    expect(declarations).toEqual([...existingDeclarations, declaration]);
  });
});

describe("when there is a style attribute with the same property on the element", () => {
  it("appends the declaration", () => {
    const declaration: css.Declaration = {
      property: "background-color",
      value: "black",
    };

    const existingDeclarations: css.Declaration[] = [
      {
        property: "background-color",
        value: "white",
      },
    ];

    const declarations: css.Declaration[] = applyDeclaration(
      existingDeclarations,
      declaration
    );

    expect(declarations).toEqual(existingDeclarations);
  });
});
