import type { MjNavbarLink, MjNavbarLinkAttributes } from "mjmlast";
import { h } from "hastscript";
import type { Options } from "..";
import type { Element as HElement, Text as HText } from "hast";
import type { CssPropertiesWithWeirdEmail } from "../helpers/json-to-css";
import { jsonToCss } from "../helpers/json-to-css";
import { Attributes } from "../helpers/attributes/Attributes";
import { MSO_OR_IE } from "../helpers/conditional-comments/conditional-comment";
import classnames from "classnames";
import type { MjNavbarContext } from "./mj-navbar";
import type { Property } from "csstype";
import { DownlevelHidden } from "../helpers/conditional-comments/DownlevelHidden";
import { text } from "./text";

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
  _parent: null,
  _options: Options,
  context: MjNavbarContext
): HElement[] {
  const attributes = new Attributes({
    attributes: node.attributes || {},
    defaultAttributes: DEFAULT_ATTRIBUTES || {},
    mjClass: node.attributes["mj-class"],
    mjClassesAttributes: context.mjClassesAttributes,
    mjAllAttributes: context.mjAllAttributes,
  });

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

  const url = new Link(context.navbarBaseUrl, href.toString()).url.toString();

  const anchorClassnames = classnames(`mj-link`, attributes.get("css-class"));

  const conditional: DownlevelHidden = new DownlevelHidden(MSO_OR_IE);

  const children: HText[] = node.children.map((textChild) => {
    return text(textChild);
  });

  const anchorTag = h(
    "a",
    {
      class: anchorClassnames,
      href: url,
      target: attributes.get("target"),
      name: attributes.get("name"),
      style: jsonToCss(anchorStyleProperties),
      value: "",
    },
    children
  );

  return [
    conditional.begin,
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
      [conditional.end, anchorTag, conditional.begin]
    ),
    conditional.end,
  ];
}
