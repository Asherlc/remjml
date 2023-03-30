import type {
  MjNavbarLink,
  MjNavbarLinkAttributes,
  UniversalAttributes,
} from "mjmlast";
import { h } from "hastscript";
import { Options } from "..";
import { Element as HElement } from "hast";
import { CssPropertiesWithWeirdEmail, jsonToCss } from "../helpers/json-to-css";
import { Attributes } from "../helpers/Attributes";
import {
  beginConditionalComment,
  endConditionalComment,
  MSO_OR_IE,
} from "../helpers/conditional-comment";
import classnames from "classnames";
import { MjNavbarContext } from "./mj-navbar";
import { Property } from "csstype";

const DEFAULT_ATTRIBUTES: Pick<
  MjNavbarLinkAttributes,
  | "color"
  | "font-size"
  | "font-family"
  | "font-weight"
  | "line-height"
  | "padding"
  | "target"
  | "text-decoration"
  | "text-transform"
> = {
  color: "#000000",
  "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
  "font-size": "13px",
  "font-weight": "normal",
  "line-height": "22px",
  padding: "15px 10px",
  target: "_blank",
  "text-decoration": "none",
  "text-transform": "uppercase",
};

class Link {
  #href: string;
  #baseUrl?: string;

  constructor(baseUrl: string | undefined, href: string) {
    this.#baseUrl = baseUrl;
    this.#href = href;
  }

  get url(): URL {
    if (this.#baseUrl) {
      const url: URL = new URL(this.#baseUrl);
      url.pathname = this.#href;

      return url;
    }

    return new URL(this.#href);
  }
}

export function mjNavbarLink(
  node: MjNavbarLink,
  parent: null,
  options: Options,
  context: MjNavbarContext
): HElement[] {
  const attributes = new Attributes<
    Partial<MjNavbarLinkAttributes & UniversalAttributes>
  >(
    node.attributes || {},
    DEFAULT_ATTRIBUTES || {},
    context.defaultAttributes?.["mj-navbar-link"] || {},
    context.defaultAttributes?.["mj-all"] || {}
  );

  const href = attributes.get("href");

  if (!href) {
    throw new Error(`No href on mj-navbar-link: ${JSON.stringify(node)}`);
  }

  const anchorStyleProperties: CssPropertiesWithWeirdEmail = {
    display: "inline-block",
    color: attributes.get("color"),
    fontFamily: attributes.get("font-family"),
    fontSize: attributes.get("font-size"),
    fontStyle: attributes.get("font-style"),
    fontWeight: attributes.get("font-weight"),
    letterSpacing: attributes.get("letter-spacing"),
    lineHeight: attributes.get("line-height"),
    textDecoration: attributes.get("text-decoration"),
    textTransform: attributes.get("text-transform") as Property.TextTransform,
    padding: attributes.get("padding"),
    paddingTop: attributes.get("padding-top"),
    paddingLeft: attributes.get("padding-left"),
    paddingRight: attributes.get("padding-right"),
    paddingBottom: attributes.get("padding-bottom"),
  };

  const url = new Link(context.navbarBaseUrl, href).url.toString();

  const anchorClassnames = classnames(`mj-link`, attributes.get("css-class"));

  return [
    beginConditionalComment({
      type: "downlevel-hidden",
      expression: MSO_OR_IE,
    }),
    h(
      "td",
      {
        style: jsonToCss({
          padding: attributes.get("padding"),
          paddingTop: attributes.get("padding-top"),
          paddingLeft: attributes.get("padding-left"),
          paddingRight: attributes.get("padding-right"),
          paddingBottom: attributes.get("padding-bottom"),
        }),
        class: `${attributes.get("css-class")}-outlook`,
      },
      [
        endConditionalComment({
          type: "downlevel-hidden",
        }),
        h(
          "a",
          {
            class: anchorClassnames,
            href: url,
            target: attributes.get("target"),
            name: attributes.get("name"),
            style: jsonToCss(anchorStyleProperties),
          },
          node.children as any
        ),
        beginConditionalComment({
          type: "downlevel-hidden",
          expression: MSO_OR_IE,
        }),
      ]
    ),
    endConditionalComment({
      type: "downlevel-hidden",
    }),
  ];
}
