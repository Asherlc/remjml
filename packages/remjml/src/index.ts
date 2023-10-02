import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";
import { MjmlRoot } from "mjmlast";
import { Root as HRoot } from "hast";

export const remjml = unified()
  .use<[], string, MjmlRoot>(remjmlParse)
  .use<[], MjmlRoot, HRoot>(remjmlRehype)
  .use(rehypeStringify, {
    allowDangerousHtml: true,
  })
  .freeze();
