import { x } from "xastscript";
import { getBoxWidths } from "../helpers/get-box-widths";
import { min } from "lodash-es";
import type {
  MjImage,
  MjHero,
  MjColumn,
  MjImageAttributes,
  MjmlRoot,
} from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";
import { all } from "../traverse";
import { u } from "unist-builder";

export function mjml(
  node: MjmlRoot,
  parent: never,
  options: Options,
  context: Context
): HElement {
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
    [
      h("head", [
        u(
          "conditional-comment",
          {
            value: "mso",
            commentType: "downlevel-hidden",
          },
          [h("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" })]
        ) as any,
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
        u(
          "conditional-comment",
          {
            value: "mso",
            commentType: "downlevel-hidden",
          },
          [
            h(
              "noscript",
              x(
                "xml",
                x("o:OfficeDocumentSettings", [
                  x("o:AllowPNG"),
                  x("o:PixelsPerInch", 96),
                ])
              ) as any
            ),
          ]
        ) as any,
        u(
          "conditional-comment",
          {
            value: "lte mso 11",
            type: "downlevel-hidden",
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
      ]),
      ...children,
    ]
  );

  return addPosition(node, hDoc);
}
