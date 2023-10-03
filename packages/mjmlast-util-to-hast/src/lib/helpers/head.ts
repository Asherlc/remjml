import { h } from "hastscript";
import { conditionalComment } from "./conditional-comments/conditional-comment";
import { Breakpoint } from "./BreakPoint";

const DEFAULT_BREAKPOINT_PX = "480px" as const;
const BREAKPOINT_PARTS = new Breakpoint(DEFAULT_BREAKPOINT_PX).lower;

export const head = h("head", [
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
          @media only screen and (max-width:${BREAKPOINT_PARTS.value}${BREAKPOINT_PARTS.unit}) {
            .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
            .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
            .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
            .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
            .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
            .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
          }`
  ),
]);
