import { VFile } from "vfile";
import { fromMjml } from "mjmlast-util-from-mjml";
import { Plugin } from "unified";

type Options = {
  emitParseErrors?: boolean;
};

export default function remjmlParse(
  this: Plugin<[Options?] | Array<void>, string, string>
) {
  Object.assign(this, { Parser: parser });

  function parser(doc: string, file: VFile) {
    const mjmlast = fromMjml(String(file));
    return mjmlast;
  }

  return parser;
}
