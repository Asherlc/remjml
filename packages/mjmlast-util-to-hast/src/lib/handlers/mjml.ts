// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import type { Parts } from "units-css";
import units from "units-css";
import type { MjmlRoot } from "mjmlast";
import { h } from "hastscript";
import type { Element as HElement, Doctype as HDoctype } from "hast";
import type { Options } from "..";
import { addPosition } from "..";
import type { Context } from "../types";
import { all } from "../traverse";
import { conditionalComment } from "../helpers/conditional-comments/conditional-comment";

// MJML only supports px-based breakpoints
class Breakpoint {
  #px: string;

  constructor(px: string) {
    this.#px = px;
  }

  get lower(): Parts {
    const { value, unit } = units.parse(this.#px);

    return { value: value - 1, unit };
  }
}

const DEFAULT_BREAKPOINT = "480px";

export function mjml(
  node: MjmlRoot,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any,
  options: Options,
  context: Context
): [HDoctype, ...HElement[]] {
  const attributes = node.attributes || {};

  const children = all(node, options, context);

  const breakpoint = new Breakpoint(DEFAULT_BREAKPOINT).lower;

  const head = h("head", [
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
    // mj-navbar styles
    h(
      "style",
      {
        type: "text/css",
      },
      `
            noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }
            @media only screen and (max-width:${breakpoint.value}${breakpoint.unit}) {
              .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
              .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
              .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
              .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
            }`
    ),
  ]);

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
