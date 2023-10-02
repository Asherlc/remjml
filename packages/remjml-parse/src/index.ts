import { fromMjml } from "mjmlast-util-from-mjml";
import type { Processor, Plugin, Parser } from "unified";
import type { MjmlRoot } from "mjmlast";

const parser: Parser<MjmlRoot> = (doc: string, file): MjmlRoot => {
  const mjmlast: MjmlRoot = fromMjml(String(file));
  return mjmlast;
};

const remjmlParse: Plugin<[], string, MjmlRoot> = function (
  this: Processor
): void {
  this.parser = parser;
};

export default remjmlParse;
