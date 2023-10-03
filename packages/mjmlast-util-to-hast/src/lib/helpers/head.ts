import { h } from "hastscript";
import type { Element as HElement } from "hast";
import { conditionalComment } from "./conditional-comments/conditional-comment";
import { find } from "unist-util-find";
import { styles as mjNavbarStyles } from "../handlers/mj-navbar";
import type { Node as UnistNode } from "unist";
import { compact } from "lodash-es";

export const head = (tree: UnistNode): HElement => {
  const hasNavbar: boolean = Boolean(find(tree, { type: "mj-navbar" }));

  const children = [
    h("title"),
    conditionalComment(
      {
        expression: "mso",
        type: "downlevel-hidden",
        display: "non-ie",
      },
      [h("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" })]
    ),
    h("meta", {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    }),
    h("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    }),
    h(
      "style",
      {
        type: "text/css",
      },
      `#outlook a { padding:0; }
body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
p { display:block;margin:13px 0; }`
    ),
    conditionalComment(
      {
        expression: "mso",
        type: "downlevel-hidden",
      },
      [
        h(
          "noscript",
          h(
            "xml",
            h("o:OfficeDocumentSettings", [
              h("o:AllowPNG"),
              h("o:PixelsPerInch", 96),
            ])
          )
        ),
      ]
    ),
    conditionalComment(
      {
        expression: "lte mso 11",
        type: "downlevel-revealed",
      },
      [
        h(
          "style",
          {
            type: "text/css",
          },
          ".mj-outlook-group-fix { width:100% !important; }"
        ),
      ]
    ),
    hasNavbar ? mjNavbarStyles : undefined,
  ];

  return h("head", compact(children));
};
