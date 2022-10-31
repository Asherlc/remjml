import type { MjBody } from "mjmlast";
import { h as hastH } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { all } from "../traverse";

const DEFAULT_ATTRIBUTES: Pick<MjBody["attributes"], "width"> = {
  width: "600px",
};

export function mjBody(
  node: MjBody,
  options: Options,
  context: Context
): HElement {
  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const children = all(node, options, context);

  const hBody = hastH(
    "div",
    {
      class: node.attributes["css-class"],
      style: `background-color: ${attributes["background-color"]}`,
    },
    children
  );

  return addPosition(node, hBody);
}
