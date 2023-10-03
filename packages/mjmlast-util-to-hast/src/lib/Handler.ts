import type { ElementContent as HContent, Doctype as HDoctype } from "hast";
import type { Context } from "./types";
import type { Options } from ".";

export type Handler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any,
  options: Options,
  context: Context
) => HContent | Array<HContent> | [HDoctype, ...HContent[]];
