import { VFile } from "vfile";
import { Root } from "xast";
import { fromXml } from "xast-util-from-xml";
import { fromXast } from "xast-util-to-mjmlast";
import { Plugin } from "unified";

type Options = {
  emitParseErrors?: boolean;
};

export default function remjmlParse(
  this: Plugin<[Options?] | Array<void>, string, Root>
) {
  Object.assign(this, { Parser: parser });

  function parser(doc: string, file: VFile) {
    const xAst = fromXml(String(file));
    const mjmlast = fromXast(xAst);
    return mjmlast;
  }

  return parser;
}
