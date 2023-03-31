import type { MjNavbar, MjNavbarAttributes } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Context } from "../types";
import type { Element as HElement } from "hast";
import { all } from "../traverse";
import { jsonToCss } from "../helpers/json-to-css";
import { Attributes } from "../helpers/Attributes";
import {
  beginConditionalComment,
  conditionalComment,
  endConditionalComment,
  MSO_OR_IE,
  NOT_MSO_OR_IE,
} from "../helpers/conditional-comment";
import { uniqueId } from "lodash-es";
import type { Property } from "csstype";

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

export function mjNavbar(
  node: MjNavbar,
  parent: null,
  options: Options,
  context: Context
): HElement[] {
  const attributes = new Attributes<Partial<MjNavbarAttributes>>(
    node.attributes || {},
    DEFAULT_ATTRIBUTES,
    context.defaultAttributes?.["mj-navbar"] || {},
    context.defaultAttributes?.["mj-all"] || {}
  );

  const children = all<MjNavbarContext>(node, options, {
    ...context,
    navbarBaseUrl: attributes.get("base-url"),
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
            "mso-hide": "all",
            "-moz-user-select": "none",
            "user-select": "none",
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
              "mso-hide": "all",
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
              "mso-hide": "all",
            }),
          },
          attributes.get("ico-close")
        )
      )
    ),
  ];

  return [
    ...(attributes.get("hamburger") === "hamburger" ? hamburger : []),
    h(
      "div",
      {
        class: "mj-inline-links",
        style: jsonToCss({
          align: attributes.get("align"),
          width: "100%",
        }),
      },
      [
        beginConditionalComment({
          type: "downlevel-hidden",
          expression: MSO_OR_IE,
        }),
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
            endConditionalComment({
              type: "downlevel-hidden",
            }),
            ...children,
            beginConditionalComment({
              expression: MSO_OR_IE,
              type: "downlevel-hidden",
            }),
          ])
        ),
        endConditionalComment({
          type: "downlevel-hidden",
        }),
      ]
    ),
  ];
}
