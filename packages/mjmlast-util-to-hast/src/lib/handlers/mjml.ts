import type { MjmlRoot } from "mjmlast";
import { h } from "hastscript";
import type { Element as HElement, Doctype as HDoctype } from "hast";
import type { Options } from "..";
import { addPosition } from "..";
import type { Context } from "../types";
import { all } from "../traverse";
import { head } from "../helpers/head";

export function mjml(
  node: MjmlRoot,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any,
  options: Options,
  context: Context
): [HDoctype, ...HElement[]] {
  const attributes = node.attributes || {};

  const children = all(node, options, context);

  const hDoc = h(
    "html",
    {
      lang: attributes.lang,
      dir: attributes.dir,
      xmlns: "http://www.w3.org/1999/xhtml",
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:o": "urn:schemas-microsoft-com:office:office",
    },
    [head, ...children]
  );

  const hDoctype: HDoctype = { type: "doctype" };

  return [hDoctype, addPosition(node, hDoc)];
}
