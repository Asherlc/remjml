import { h } from "hastscript";
import { conditionalComment } from "./conditional-comment";
import { toHtml } from "hast-util-to-html";

describe("with children", () => {
  it("return a node array", () => {
    const nodes = conditionalComment(
      {
        expression: "mso",
        type: "downlevel-hidden",
        display: "non-ie",
      },
      [h("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" })]
    );

    expect(nodes).toEqual([
      { type: "raw", value: "<!--[if mso]><!-->" },
      {
        children: [],
        properties: { content: "IE=edge", httpEquiv: ["X-UA-Compatible"] },
        tagName: "meta",
        type: "element",
      },
      { type: "raw", value: "<!--<![endif]-->" },
    ]);
  });

  it("serializes to html", () => {
    const nodes = conditionalComment(
      {
        expression: "mso",
        type: "downlevel-hidden",
        display: "non-ie",
      },
      [h("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" })]
    );

    expect(
      toHtml(nodes, {
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
      })
    ).toEqual(
      '<!--[if mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->'
    );
  });
});
