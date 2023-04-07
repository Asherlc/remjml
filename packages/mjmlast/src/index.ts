import type { Properties } from "csstype";
import type { Element } from "hast";
import type { Node, Parent as UnistParent, Literal } from "unist";

export const nodeTypes = new Set([
  "mj-attributes",
  "mj-breakpoint",
  "mj-font",
  "mj-html-attributes",
  "mj-preview",
  "mj-style",
  "mj-title",
  "mjml",
  "mj-head",
  "mj-body",
  "mj-accordion",
  "mj-button",
  "mj-carousel",
  "mj-carousel-image",
  "mj-column",
  "mj-divider",
  "mj-group",
  "mj-hero",
  "mj-image",
  "mj-navbar",
  "mj-navbar-link",
  "mj-raw",
  "mj-section",
  "mj-social",
  "mj-social-element",
  "mj-spacer",
  "mj-table",
  "mj-text",
  "mj-wrapper",
]);

export type UniversalAttributes = Partial<{
  "css-class": string;
  "mj-class": string;
}>;

// Attributes that MJ Column extracts from a child
export type MjColumnChildAttributes = Partial<{
  "container-background-color": string;
  align: "left" | "right" | "center" | "justify";
  "vertical-align": "top" | "middle" | "bottom";
  "css-class": string;
  background: string;
  padding: string;
  "padding-top": string;
  "padding-right": string;
  "padding-bottom": string;
  "padding-left": string;
}>;

type BaseAttributes = Record<string, string | number>;
type EmptyAttributes = Record<string, never>;

export interface Component<Attributes extends BaseAttributes> extends Node {
  attributes?: Partial<UniversalAttributes & Attributes>;
}

export type Parent<
  Attributes extends BaseAttributes,
  ChildNode extends Node
> = Component<Attributes> & UnistParent<ChildNode>;

export interface Text extends Literal<string> {
  type: "text";
}

export type End<Attributes extends BaseAttributes> = Parent<Attributes, Text>;

export interface MjPreview extends Parent<EmptyAttributes, Text> {
  type: "mj-preview";
}

export type MjImageAttributes = Partial<{
  alt: string;
  href: string;
  name: string;
  src: string;
  srcset: string;
  sizes: string;
  title: string;
  rel: string;
  align: "left" | "right" | "center" | "justify";
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-right": string;
  "border-top": string;
  "border-radius": string;
  "container-background-color": string;
  "fluid-on-mobile": "boolean";
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  target: string;
  width: string;
  height: string;
  "max-height": string;
  "font-size": string;
  usemap: string;
}>;

export interface MjImage extends Component<MjImageAttributes> {
  type: "mj-image";
}

export interface MjStyle extends Parent<{ inline: string }, Text> {
  type: "mj-parent";
}

export interface MjHead extends Parent<never, Text> {
  type: "mj-head";
}

export interface MjTitle extends Parent<never, Text> {
  type: "mj-title";
}

export type MjNavbarLinkAttributes = {
  color: string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  href: string;
  name: string;
  target: string;
  rel: string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-decoration": string;
  "text-transform": string;
};

export interface MjNavbarLink extends Parent<MjNavbarLinkAttributes, Text> {
  type: "mj-navbar-link";
}

type MjSocialElementAttributes = {
  align: "left" | "right" | "center" | "justify";
  "background-color": string;
  color: string;
  "border-radius": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  href: string;
  "icon-size": string;
  "icon-height": string;
  "icon-padding": string;
  "line-height": string;
  name: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-padding": string;
  rel: string;
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  title: string;
  target: string;
  "text-decoration": string;
  "vertical-align": "top" | "middle" | "bottom";
};

export interface MjSocialElement
  extends Parent<MjSocialElementAttributes, Text> {
  type: "mj-social-element";
}

type MjSpacerAttributes = {
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-right": string;
  "border-top": string;
  "container-background-color": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  height: string;
};

export interface MjSpacer extends Component<MjSpacerAttributes> {
  type: "mj-spacer";
}

type MjTableAttributes = {
  align: "left" | "right" | "center" | "justify";
  border: string;
  cellpadding: "integer";
  cellspacing: "integer";
  "container-background-color": string;
  color: string;
  "font-family": string;
  "font-size": string;
  "font-weight": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  role: "enum(none,presentation)";
  "table-layout": "enum(auto,fixed,initial,inherit)";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export interface MjTable extends Parent<MjTableAttributes, Text> {
  type: "mj-table";
}

export interface MjRaw extends End<{ position: "enum(file-start)" }> {
  type: "mj-raw";
}
type MjSocialAttributes = {
  align: "left" | "right" | "center" | "justify";
  "border-radius": string;
  "container-background-color": string;
  color: string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  "icon-size": string;
  "icon-height": string;
  "icon-padding": string;
  "inner-padding": string;
  "line-height": string;
  mode: "enum(horizontal,vertical)";
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "table-layout": "enum(auto,fixed)";
  "text-padding": string;
  "text-decoration": string;
  "vertical-align": "top" | "middle" | "bottom";
};

export interface MjSocial
  extends Parent<MjSocialAttributes, MjSocialElement | MjRaw> {
  type: "mj-social";
}

export type MjNavbarAttributes = {
  align: "left" | "right" | "center" | "justify";
  "base-url": string;
  hamburger: string;
  "ico-align": string;
  "ico-open": string;
  "ico-close": string;
  "ico-color": string;
  "ico-font-size": string;
  "ico-font-family": string;
  "ico-text-transform": string;
  "ico-padding": string;
  "ico-padding-left": string;
  "ico-padding-top": string;
  "ico-padding-right": string;
  "ico-padding-bottom": string;
  padding: string;
  "padding-left": string;
  "padding-top": string;
  "padding-right": string;
  "padding-bottom": string;
  "ico-text-decoration": string;
  "ico-line-height": string;
};

export interface MjNavbar
  extends Parent<MjNavbarAttributes, MjNavbarLink | MjRaw> {
  type: "mj-navbar";
}

export interface MjSelector
  extends Component<{
    path: string;
  }> {
  type: "mj-preview";
}

export interface MjHtmlAttributes extends Parent<never, MjSelector> {
  type: "mj-html-attributes";
}

export interface MjFont
  extends Component<{
    name: string;
    href: string;
  }> {
  type: "mj-font";
}

export interface MjBreakpoint extends Component<{ width: string }> {
  type: "mj-breakpoint";
}

export type MjDividerAttributes = {
  "border-color": string;
  "border-style": string;
  "border-width": string;
  "container-background-color": string;
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  width: string;
  align: "left" | "right" | "center" | "justify";
};

export interface MjDivider extends Component<MjDividerAttributes> {
  type: "mj-divider";
}

export interface MjCarouselImage extends Node {
  type: "mj-carousel-image";
  attributes: UniversalAttributes & {
    alt: string;
    href: string;
    rel: string;
    target: string;
    title: string;
    src: string;
    "thumbnails-src": string;
    "border-radius": string;
    "tb-border": string;
    "tb-border-radius": string;
  };
}

type MjCarouselAttributes = {
  align: "left" | "right" | "center" | "justify";
  "border-radius": string;
  "container-background-color": string;
  "icon-width": string;
  "left-icon": string;
  padding: string;
  "padding-top": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "right-icon": string;
  thumbnails: "enum(visible,hidden)";
  "tb-border": string;
  "tb-border-radius": string;
  "tb-hover-border-color": string;
  "tb-selected-border-color": string;
  "tb-width": string;
};

export interface MjCarousel
  extends Parent<MjCarouselAttributes, MjCarouselImage> {
  type: "mj-carousel";
}

export type MjBodyAttributes = Partial<{
  width: string;
  "background-color": string;
}> &
  UniversalAttributes;

export interface MjBody
  extends Parent<
    MjBodyAttributes,
    /* eslint-disable-next-line no-use-before-define */
    MjRaw | MjSection | MjWrapper | MjHero
  > {
  type: "mj-body";
}

type MjAccordionTextAttributes = {
  "background-color": string;
  "font-size": string;
  "font-family": string;
  "font-weight": string;
  "letter-spacing": string;
  "line-height": string;
  color: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordionText extends End<MjAccordionTextAttributes> {
  type: "mj-accordion-text";
}

type MjAccordionTitleAttributes = {
  "background-color": string;
  color: string;
  "font-size": string;
  "font-family": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordionTitle extends End<MjAccordionTitleAttributes> {
  type: "mj-accordion-title";
}

type MjAccordionElementAttributes = {
  "background-color": string;
  border: string;
  "font-family": string;
  "icon-align": "top" | "middle" | "bottom";
  "icon-width": string;
  "icon-height": string;
  "icon-wrapped-url": string;
  "icon-wrapped-alt": string;
  "icon-unwrapped-url": string;
  "icon-unwrapped-alt": string;
  "icon-position": "left" | "right";
};

export interface MjAccordionElement
  extends Parent<
    MjAccordionElementAttributes,
    MjAccordionTitle | MjAccordionText | MjRaw
  > {
  type: "mj-accordion-element";
}

type MjAccordionAttributes = {
  "container-background-color": string;
  border: string;
  "font-family": string;
  "icon-align": "top" | "middle" | "bottom";
  "icon-width": string;
  "icon-height": string;
  "icon-wrapped-url": string;
  "icon-wrapped-alt": string;
  "icon-unwrapped-url": string;
  "icon-unwrapped-alt": string;
  "icon-position": "left" | "right";
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
};

export interface MjAccordion
  extends Parent<MjAccordionAttributes, MjAccordionElement | MjRaw> {
  type: "mj-accordion";
}

export type MjButtonAttributes = {
  align: "left" | "right" | "center" | "justify";
  "background-color": string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  border: string;
  color: string;
  "container-background-color": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  height: string;
  href: string;
  name: string;
  title: string;
  "inner-padding": string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  rel: string;
  target: string;
  "text-decoration": string;
  "text-transform": string;
  "vertical-align": "top" | "middle" | "bottom";
  "text-align": "left" | "right" | "center";
  width: string;
};

export interface MjButton extends Parent<MjButtonAttributes, Text> {
  type: "mj-button";
}

export type MjTextAttributes = {
  align: "left" | "right" | "center" | "justify" | "justify";
  "background-color": string;
  color: string;
  "container-background-color": string;
  "font-family": string;
  "font-size": string;
  "font-style": string;
  "font-weight": string;
  height: string;
  "letter-spacing": string;
  "line-height": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  padding: string;
  "text-decoration": string;
  "text-transform": string;
  "vertical-align": "top" | "bottom" | "middle";
};

export interface MjText extends Parent<MjTextAttributes, Text | Element> {
  type: "mj-text";
}

export type MjColumnAttributes = Partial<{
  "background-color": string;
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  direction: "ltr" | "rtl";
  "inner-background-color": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  "inner-border": string;
  "inner-border-bottom": string;
  "inner-border-left": string;
  "inner-border-radius": string;
  "inner-border-right": string;
  "inner-border-top": string;
  padding: string;
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
}>;

export type MjColumnChild =
  | MjAccordion
  | MjButton
  | MjCarousel
  | MjDivider
  | MjImage
  | MjRaw
  | MjSocial
  | MjSpacer
  | MjTable
  | MjText
  | MjNavbar;

export interface MjColumn extends Parent<MjColumnAttributes, MjColumnChild> {
  type: "mj-column";
}

type MjGroupAttributes = {
  "background-color": string;
  direction: "ltr" | "rtl";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export interface MjGroup extends Parent<MjGroupAttributes, MjColumn | MjRaw> {
  type: "mj-group";
}

export type MjSectionAttributes = Partial<{
  "background-color": string;
  "background-url": string;
  "background-repeat": "repeat" | "no-repeat";
  "background-size": string;
  "background-position": string;
  "background-position-x": string;
  "background-position-y": string;
  border: string;
  "border-bottom": string;
  "border-left": string;
  "border-radius": string;
  "border-right": string;
  "border-top": string;
  direction: "ltr" | "rtl";
  "full-width": "full-width" | "false";
  padding: string;
  "padding-top": string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "text-align": string;
  "text-padding": string;
}>;

export interface MjSection
  extends Parent<MjSectionAttributes, MjColumn | MjGroup | MjRaw> {
  type: "mj-section";
}

export interface MjWrapper extends Omit<MjSection, "type"> {
  type: "mj-wrapper";
}

type MjHeroAttributes = {
  mode: string;
  height: string;
  "background-url": string;
  "background-width": string;
  "background-height": string;
  "background-position": string;
  "border-radius": string;
  "container-background-color": string;
  "inner-background-color": string;
  "inner-padding": string;
  "inner-padding-top": string;
  "inner-padding-left": string;
  "inner-padding-right": string;
  "inner-padding-bottom": string;
  padding: string;
  "padding-bottom": string;
  "padding-left": string;
  "padding-right": string;
  "padding-top": string;
  "background-color": string;
  "vertical-align": "top" | "middle" | "bottom";
};

type MjHeroChild =
  | MjButton
  | MjAccordion
  | MjCarousel
  | MjDivider
  | MjImage
  | MjSocial
  | MjSpacer
  | MjTable
  | MjText
  | MjNavbar
  | MjRaw;

export interface MjHero extends Parent<MjHeroAttributes, MjHeroChild> {
  type: "mj-hero";
}

export interface MjClass extends Node {
  type: "mj-class";
  attributes: { name: string } & Properties;
}

export interface MjAll extends Node {
  type: "mj-all";
  attributes: Record<string, string>;
}

export type MjmlRootAttributes = Partial<{
  owa: string;
  lang: string;
  dir: string;
}>;

export interface MjmlRoot
  extends Parent<MjmlRootAttributes, MjBody | MjHead | MjRaw> {
  type: "mjml";
}

type MjAttributesChild =
  | MjClass
  | MjAll
  | MjColumn
  | MjWrapper
  | MjSection
  | MjText
  | MjButton
  | MjAccordion
  | MjAccordionElement
  | MjAccordionTitle
  | MjAccordionText
  | MjBody
  | MjButton
  | MjCarousel
  | MjCarouselImage
  | MjColumn
  | MjDivider
  | MjGroup
  | MjHero
  | MjImage
  | MjNavbar
  | MjNavbarLink
  | MjRaw
  | MjSection
  | MjSocial
  | MjSocialElement
  | MjSpacer
  | MjTable
  | MjText
  | MjWrapper
  | MjHead
  | MjHtmlAttributes
  | MjPreview
  | MjStyle
  | MjTitle
  | MjSelector;

export interface MjAttributes extends Parent<never, MjAttributesChild> {
  type: "mj-attributes";
}

export type MjmlNode =
  | MjAll
  | MjColumn
  | MjWrapper
  | MjSection
  | MjText
  | MjButton
  | MjAccordion
  | MjAccordionElement
  | MjAccordionTitle
  | MjAccordionText
  | MjAttributes
  | MjBody
  | MjButton
  | MjCarousel
  | MjCarouselImage
  | MjColumn
  | MjDivider
  | MjGroup
  | MjHero
  | MjImage
  | MjNavbar
  | MjNavbarLink
  | MjRaw
  | MjSection
  | MjSocial
  | MjSocialElement
  | MjSpacer
  | MjTable
  | MjText
  | MjWrapper
  | MjHead
  | MjHtmlAttributes
  | MjPreview
  | MjStyle
  | MjTitle
  | Text
  | MjSelector
  | MjmlRoot;
