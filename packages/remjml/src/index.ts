import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import type { MjmlRoot } from "mjmlast";
import type { Root as HRoot } from "hast";

export const remjml = unified()
  .use<[], string, MjmlRoot>(remjmlParse)
  .use<[], MjmlRoot, HRoot>(remjmlRehype)
  .use(rehypeStringify, {
    allowDangerousHtml: true,
  })
  .freeze();
