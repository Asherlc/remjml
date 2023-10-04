import type { Element } from "hast";
import type { Node, Parent as UnistParent, Literal } from "unist";

export const componentTypes = new Set([
  "mj-class",
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

export const nodeTypes = new Set([...Array.from(componentTypes), "text"]);

export type UniversalAttributes = Partial<{
  "css-class": string;
  "mj-class": string;
}>;

// Attributes that MJ Column extracts from a child

type BaseAttributes = Record<string, string | number>;
type EmptyAttributes = Record<string, never>;

export interface Component<Attributes extends BaseAttributes> extends Node {
  attributes?: Partial<UniversalAttributes & Attributes>;
}

export interface Parent<Attributes extends BaseAttributes = BaseAttributes>
  extends Component<Attributes>,
    UnistParent {}

export interface Text extends Literal {
  type: "text";
  value: string;
}

export interface End<Attributes extends BaseAttributes>
  extends Parent<Attributes> {
  children: Text[];
}

export interface MjPreview extends Parent<EmptyAttributes> {
  type: "mj-preview";
  children: Text[];
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

export interface MjStyle extends Parent<{ inline: string }> {
  type: "mj-parent";
  children: Text[];
}

export interface MjHead extends Parent<never> {
  type: "mj-head";
  children: Text[];
}

export interface MjTitle extends Parent<never> {
  type: "mj-title";
  children: Text[];
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

export interface MjNavbarLink extends Parent<MjNavbarLinkAttributes> {
  children: Text[];
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

export interface MjSocialElement extends Parent<MjSocialElementAttributes> {
  type: "mj-social-element";
  children: Text[];
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

export interface MjTable extends Parent<MjTableAttributes> {
  type: "mj-table";
  children: Text[];
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

export interface MjSocial extends Parent<MjSocialAttributes> {
  type: "mj-social";
  children: (MjSocialElement | MjRaw)[];
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

export interface MjNavbar extends Parent<MjNavbarAttributes> {
  children: (MjNavbarLink | MjRaw)[];
  type: "mj-navbar";
}

export interface MjSelector
  extends Component<{
    path: string;
  }> {
  type: "mj-preview";
}

export interface MjHtmlAttributes extends Parent<never> {
  children: MjSelector[];
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

export interface MjCarouselImage
  extends Component<{
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
  }> {
  type: "mj-carousel-image";
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

export interface MjCarousel extends Parent<MjCarouselAttributes> {
  children: MjCarouselImage[];
  type: "mj-carousel";
}

export type MjBodyAttributes = Partial<{
  width: string;
  "background-color": string;
}> &
  UniversalAttributes;

export interface MjBody extends Parent<MjBodyAttributes> {
  type: "mj-body";
  /* eslint-disable-next-line no-use-before-define */
  children: (MjRaw | MjSection | MjWrapper | MjHero)[];
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
  extends Parent<MjAccordionElementAttributes> {
  children: (MjAccordionTitle | MjAccordionText | MjRaw)[];
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

export interface MjAccordion extends Parent<MjAccordionAttributes> {
  children: (MjAccordionElement | MjRaw)[];
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

export interface MjButton extends Parent<MjButtonAttributes> {
  type: "mj-button";
  children: Text[];
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

export interface MjText extends Parent<MjTextAttributes> {
  type: "mj-text";
  children: (Text | Element)[];
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

export interface MjColumn extends Parent<MjColumnAttributes> {
  type: "mj-column";
  children: MjColumnChild[];
}

export type MjGroupAttributes = {
  "background-color": string;
  direction: "ltr" | "rtl";
  "vertical-align": "top" | "middle" | "bottom";
  width: string;
};

export interface MjGroup extends Parent<MjGroupAttributes> {
  type: "mj-group";
  children: (MjColumn | MjRaw)[];
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

export interface MjSection extends Parent<MjSectionAttributes> {
  type: "mj-section";
  children: (MjColumn | MjGroup | MjRaw)[];
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

export interface MjHero extends Parent<MjHeroAttributes> {
  type: "mj-hero";
  children: MjHeroChild[];
}

export interface MjClass
  extends Component<{ name: string } & Record<string, string>> {
  type: "mj-class";
}

export interface MjAll extends Component<Record<string, string>> {
  type: "mj-all";
}

export type MjmlRootAttributes = Partial<{
  owa: string;
  lang: string;
  dir: string;
}>;

export interface MjmlRoot extends Parent<MjmlRootAttributes> {
  type: "mjml";
  children: (MjBody | MjHead | MjRaw)[];
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

export interface MjAttributes extends Parent<never> {
  children: MjAttributesChild[];
  type: "mj-attributes";
}

export type MjmlComponent =
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
  | MjSelector
  | MjmlRoot;

export type MjmlNode = MjmlComponent | Text;
