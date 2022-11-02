import type { MjBody, MjBodyAttributes } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { all } from "../traverse";
import { jsonToCss } from "../helpers/json-to-css";

const DEFAULT_ATTRIBUTES: Pick<MjBodyAttributes, "width"> = {
  width: "600px",
};

export function mjBody(
  node: MjBody,
  parent: null,
  options: Options,
  context: Context
): HElement {
  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const children = all(node, options, {
    ...context,
    containerWidth: attributes.width,
  });

  const backgroundColor = attributes["background-color"];
  const hBody = h(
    "body",
    {
      style: jsonToCss({
        wordSpacing: "normal",
        backgroundColor,
      }),
    },
    h(
      "div",
      {
        class: attributes["css-class"],
        style: jsonToCss({ backgroundColor }),
      },
      children
    )
  );

  return addPosition(node, hBody);
}
