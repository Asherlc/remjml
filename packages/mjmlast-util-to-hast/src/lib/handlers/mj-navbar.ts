import type { MjNavbar, MjNavbarAttributes } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Context } from "../types";
import type { Element as HElement } from "hast";
import { all } from "../traverse";
import { jsonToCss } from "../helpers/json-to-css";
import { Attributes } from "../helpers/attributes/Attributes";
import {
  conditionalComment,
  MSO_OR_IE,
  NOT_MSO_OR_IE,
} from "../helpers/conditional-comments/conditional-comment";
import { uniqueId } from "lodash-es";
import type { Property } from "csstype";
import { DownlevelHidden } from "../helpers/conditional-comments/DownlevelHidden";

import { Breakpoint } from "../helpers/BreakPoint";

export type MjNavbarContext = Context & {
  navbarBaseUrl: string | undefined;
};

const DEFAULT_ATTRIBUTES: Pick<
  MjNavbarAttributes,
  | "align"
  | "ico-align"
  | "ico-close"
  | "ico-color"
  | "ico-font-family"
  | "ico-font-size"
  | "ico-text-transform"
  | "ico-text-decoration"
  | "ico-open"
  | "ico-line-height"
  | "ico-padding"
> = {
  align: "center",
  "ico-align": "center",
  "ico-open": "&#9776;",
  "ico-close": "&#8855;",
  "ico-color": "#000000",
  "ico-font-size": "30px",
  "ico-font-family": "Ubuntu, Helvetica, Arial, sans-serif",
  "ico-text-transform": "uppercase",
  "ico-padding": "10px",
  "ico-text-decoration": "none",
  "ico-line-height": "30px",
};

const DEFAULT_BREAKPOINT_PX = "480px" as const;
const BREAKPOINT_PARTS = new Breakpoint(DEFAULT_BREAKPOINT_PX).lower;

export const styles = h(
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
);

export function mjNavbar(
  node: MjNavbar,
  _parent: null,
  options: Options,
  context: Context
): HElement[] {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES,
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClassesAttributes,
    mjAllAttributes: context.mjAllAttributes,
  });

  const children = all(node, options, {
    ...context,
    navbarBaseUrl: attributes.get("base-url")?.toString(),
  });

  const inputId = `mj-navbar-hamburger-input-${uniqueId()}`;

  const hamburger: HElement[] = [
    ...conditionalComment(
      {
        expression: NOT_MSO_OR_IE,
        type: "downlevel-hidden",
      },
      h("input", {
        type: "checkbox",
        id: inputId,
        class: "mj-menu-checkbox",
        style: jsonToCss({
          display: "none !important",
          maxHeight: 0,
          visibility: "hidden",
        }),
      })
    ),
    h(
      "div",
      {
        class: "mj-menu-trigger",
        style: jsonToCss({
          display: "none",
          maxHeight: "0px",
          maxWidth: "0px",
          fontSize: "0px",
          overflow: "hidden",
        }),
      },
      h(
        "label",
        {
          for: inputId,
          class: "mj-menu-label",
          style: jsonToCss({
            display: "block",
            cursor: "pointer",
            msoHide: "all",
            "-moz-user-select": "none",
            userSelect: "none",
            color: attributes.get("ico-color"),
            fontSize: attributes.get("ico-font-size"),
            fontFamily: attributes.get("ico-font-family"),
            textTransform: attributes.get(
              "ico-text-transform"
            ) as Property.TextTransform,
            textDecoration: attributes.get("ico-text-decoration"),
            lineHeight: attributes.get("ico-line-height"),
            paddingTop: attributes.get("ico-padding-top"),
            paddingRight: attributes.get("ico-padding-right"),
            paddingBottom: attributes.get("ico-padding-bottom"),
            paddingLeft: attributes.get("ico-padding-left"),
            padding: attributes.get("ico-padding"),
          }),
          align: attributes.get("ico-align"),
        },
        h(
          "span",
          {
            class: "mj-menu-icon-open",
            style: jsonToCss({
              msoHide: "all",
            }),
          },
          attributes.get("ico-open")
        ),
        h(
          "span",
          {
            class: "mj-menu-icon-close",
            style: jsonToCss({
              display: "none",
              msoHide: "all",
            }),
          },
          attributes.get("ico-close")
        )
      )
    ),
  ];

  const hiddenOnMsoOrIeConditional: DownlevelHidden = new DownlevelHidden(
    MSO_OR_IE
  );

  return [
    ...(attributes.get("hamburger") === "hamburger" ? hamburger : []),
    h(
      "div",
      {
        class: "mj-inline-links",
        style: jsonToCss({
          align: attributes.get("align")?.toString(),
          width: "100%",
        }),
      },
      [
        hiddenOnMsoOrIeConditional.begin,
        h(
          "table",
          {
            role: "presentation",
            border: "0",
            cellpadding: "0",
            cellspacing: "0",
            align: attributes.get("align"),
          },
          h("tr", [
            hiddenOnMsoOrIeConditional.end,
            ...children,
            hiddenOnMsoOrIeConditional.begin,
          ])
        ),
        hiddenOnMsoOrIeConditional.end,
      ]
    ),
  ];
}
