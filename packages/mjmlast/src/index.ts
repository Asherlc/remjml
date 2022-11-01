import type { Node, Parent as UnistParent, Literal } from "unist";

type UniversalAttributes = {
  "css-class": string;
  "mj-class": string;
};

// Attributes that MJ Column extracts from a child
type MjColumnChildAttributes = Partial<{
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

export interface MjColumnChild extends Node {
  attributes: MjColumnChildAttributes;
  type: MjColumn["children"][number]["type"];
}

export interface Component extends Node {
  attributes: UniversalAttributes;
}

export interface Parent extends UnistParent {}

export interface Text extends Literal {
  type: "text";
}

export interface End extends Parent {
  children: Text[];
}

export interface MjPreview extends Parent {
  type: "mj-preview";
  children: Text[];
}

export interface MjHero extends Parent {
  type: "mj-hero";
  attributes: UniversalAttributes & {
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
  children: Array<
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
    | MjRaw
  >;
}

export interface MjImage extends Node {
  type: "mj-image";
  attributes: UniversalAttributes & {
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
  };
}

export interface MjStyle extends Parent {
  type: "mj-parent";
  attributes: UniversalAttributes & {
    inline: string;
  };
  children: Text[];
}

export interface MjHead extends Parent {
  type: "mj-head";
  children: Text[];
}

export interface MjTitle extends Parent {
  type: "mj-title";
  children: Text[];
}

export interface MjNavbarLink extends Parent {
  type: "mj-navbar-link";
  attributes: UniversalAttributes & {
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
  children: Text[];
}

export interface MjSocialElement extends Parent {
  type: "mj-social-element";
  attributes: UniversalAttributes & {
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
  children: Text[];
}

export interface MjSpacer extends Node {
  type: "mj-spacer";
  attributes: UniversalAttributes & {
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
}

export interface MjTable extends Parent {
  type: "mj-table";
  attributes: UniversalAttributes & {
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
  children: Text[];
}

export interface MjSocial extends Parent {
  type: "mj-social";
  attributes: UniversalAttributes & {
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
  children: Array<MjSocialElement | MjRaw>;
}

export interface MjNavbar extends Parent {
  type: "mj-navbar";
  attributes: UniversalAttributes & {
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
  children: Array<MjNavbarLink | MjRaw>;
}

export interface MjRaw extends End {
  type: "mj-raw";
  attributes: UniversalAttributes & {
    position: "enum(file-start)";
  };
}

export interface MjSelector extends Node {
  type: "mj-preview";
  attributes: UniversalAttributes & {
    path: string;
  };
}

export interface MjHtmlAttributes extends Parent {
  type: "mj-html-attributes";
  children: [MjSelector];
}

export interface MjFont extends Node {
  type: "mj-font";
  attributes: UniversalAttributes & {
    name: string;
    href: string;
  };
}

export interface MjAttributes extends Parent {
  type: "mj-attributes";
  children: [MjmlNode];
}

export interface MjBreakpoint extends Node {
  type: "mj-breakpoint";
  attributes: UniversalAttributes & {
    width: string;
  };
}

export interface MjGroup extends Parent {
  type: "mj-group";
  attributes: UniversalAttributes & {
    "background-color": string;
    direction: "ltr" | "rtl";
    "vertical-align": "top" | "middle" | "bottom";
    width: string;
  };
  children: Array<MjColumn | MjRaw>;
}

interface MjDivider extends Node {
  type: "mj-divider";
  attributes: UniversalAttributes & {
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

export interface MjCarousel extends Parent {
  type: "mj-carousel";
  attributes: UniversalAttributes & {
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
  children: [MjCarouselImage];
}

export interface MjBody extends Parent {
  type: "mj-body";
  attributes: UniversalAttributes & {
    width: string;
    "background-color": string;
  };
  children: Array<MjRaw | MjSection | MjWrapper | MjHero>;
}

export interface MjAccordionText extends End {
  type: "mj-accordion-text";
  attributes: UniversalAttributes & {
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
}

export interface MjAccordionTitle extends End {
  type: "mj-accordion-title";
  attributes: UniversalAttributes & {
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
}

export interface MjAccordionElement extends Parent {
  type: "mj-accordion-element";
  attributes: UniversalAttributes & {
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
  children: Array<MjAccordionTitle | MjAccordionText | MjRaw>;
}

export interface MjAccordion extends Parent {
  type: "mj-accordion";
  attributes: UniversalAttributes & {
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
  children: [MjAccordionElement, MjRaw];
}

export interface MjButton extends Parent {
  type: "mj-button";
  attributes: UniversalAttributes & {
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
  children: Text[];
}

export interface MjText extends Parent {
  type: "mj-text";
  children: Text[];
  attributes: UniversalAttributes & {
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
}

export interface MjSection extends Parent {
  type: "mj-section";
  attributes: UniversalAttributes & {
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
  };
  children: Array<MjColumn | MjGroup | MjRaw>;
}

export interface MjWrapper extends Omit<MjSection, "type"> {
  type: "mj-wrapper";
}

export interface MjColumn extends Parent {
  type: "mj-column";
  attributes: UniversalAttributes & {
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
  };
  children: Array<
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
    | MjNavbar
  >;
}

export type MjmlNode =
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
  | Text
  | MjSelector;
