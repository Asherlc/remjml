import type { MjBody, MjBodyAttributes } from "mjmlast";
import { h as hastH } from "hastscript";
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

  const hBody = hastH(
    "div",
    {
      class: attributes["css-class"],
      style: jsonToCss({ backgroundColor: attributes["background-color"] }),
    },
    children
  );

  return addPosition(node, hBody);
}
