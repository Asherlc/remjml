import { unified } from "unified";
import remjmlRehype from "remjml-rehype";
import rehypeStringify from "rehype-stringify";
import remjmlParse from "remjml-parse";

export const remjml = unified()
  .use(remjmlParse)
  .use(remjmlRehype as any)
  .use(rehypeStringify, {
    allowDangerousHtml: true,
  })
  .freeze();
