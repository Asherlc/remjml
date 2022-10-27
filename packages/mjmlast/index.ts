import type { Node, Parent as UnistParent, Literal } from "unist";

export interface Component extends Node {
  attributes: {};
  children: never[];
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
  children: [Text];
}

export interface MjHero extends Parent {
  type: "mj-hero";
  attributes: {
    mode: "string";
    height: "unit(px,%)";
    "background-url": "string";
    "background-width": "unit(px,%)";
    "background-height": "unit(px,%)";
    "background-position": "string";
    "border-radius": "string";
    "container-background-color": "color";
    "inner-background-color": "color";
    "inner-padding": "unit(px,%){1,4}";
    "inner-padding-top": "unit(px,%)";
    "inner-padding-left": "unit(px,%)";
    "inner-padding-right": "unit(px,%)";
    "inner-padding-bottom": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    "background-color": "color";
    "vertical-align": "enum(top,bottom,middle)";
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
  attributes: {
    alt: "string";
    href: "string";
    name: "string";
    src: "string";
    srcset: "string";
    sizes: "string";
    title: "string";
    rel: "string";
    align: "enum(left,center,right)";
    border: "string";
    "border-bottom": "string";
    "border-left": "string";
    "border-right": "string";
    "border-top": "string";
    "border-radius": "unit(px,%){1,4}";
    "container-background-color": "color";
    "fluid-on-mobile": "boolean";
    padding: "unit(px,%){1,4}";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    target: "string";
    width: "unit(px)";
    height: "unit(px,auto)";
    "max-height": "unit(px,%)";
    "font-size": "unit(px)";
    usemap: "string";
  };
}

export interface MjStyle extends Parent {
  type: "mj-parent";
  attributes: {
    inline: string;
  };
  children: [Text];
}

export interface MjHead extends Parent {
  type: "mj-head";
  children: [Node];
}

export interface MjTitle extends Parent {
  type: "mj-title";
  children: [Text];
}

export interface MjNavbarLink extends Parent {
  type: "mj-navbar-link";
  attributes: {
    color: "color";
    "font-family": "string";
    "font-size": "unit(px)";
    "font-style": "string";
    "font-weight": "string";
    href: "string";
    name: "string";
    target: "string";
    rel: "string";
    "letter-spacing": "unitWithNegative(px,em)";
    "line-height": "unit(px,%,)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    "text-decoration": "string";
    "text-transform": "string";
  };
  children: [Text];
}

export interface MjSocialElement extends Parent {
  type: "mj-social-element";
  attributes: {
    align: "enum(left,center,right)";
    "background-color": "color";
    color: "color";
    "border-radius": "unit(px)";
    "font-family": "string";
    "font-size": "unit(px)";
    "font-style": "string";
    "font-weight": "string";
    href: "string";
    "icon-size": "unit(px,%)";
    "icon-height": "unit(px,%)";
    "icon-padding": "unit(px,%){1,4}";
    "line-height": "unit(px,%,)";
    name: "string";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    "text-padding": "unit(px,%){1,4}";
    rel: "string";
    src: "string";
    srcset: "string";
    sizes: "string";
    alt: "string";
    title: "string";
    target: "string";
    "text-decoration": "string";
    "vertical-align": "enum(top,middle,bottom)";
  };
  children: [Text];
}

export interface MjSpacer extends Node {
  type: "mj-spacer";
  attributes: {
    border: "string";
    "border-bottom": "string";
    "border-left": "string";
    "border-right": "string";
    "border-top": "string";
    "container-background-color": "color";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    height: "unit(px,%)";
  };
}

export interface MjTable extends Parent {
  type: "mj-table";
  attributes: {
    align: "enum(left,right,center)";
    border: "string";
    cellpadding: "integer";
    cellspacing: "integer";
    "container-background-color": "color";
    color: "color";
    "font-family": "string";
    "font-size": "unit(px)";
    "font-weight": "string";
    "line-height": "unit(px,%,)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    role: "enum(none,presentation)";
    "table-layout": "enum(auto,fixed,initial,inherit)";
    "vertical-align": "enum(top,bottom,middle)";
    width: "unit(px,%)";
  };
  children: [Text];
}

export interface MjSocial extends Parent {
  type: "mj-social";
  attributes: {
    align: "enum(left,right,center)";
    "border-radius": "unit(px,%)";
    "container-background-color": "color";
    color: "color";
    "font-family": "string";
    "font-size": "unit(px)";
    "font-style": "string";
    "font-weight": "string";
    "icon-size": "unit(px,%)";
    "icon-height": "unit(px,%)";
    "icon-padding": "unit(px,%){1,4}";
    "inner-padding": "unit(px,%){1,4}";
    "line-height": "unit(px,%,)";
    mode: "enum(horizontal,vertical)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    "table-layout": "enum(auto,fixed)";
    "text-padding": "unit(px,%){1,4}";
    "text-decoration": "string";
    "vertical-align": "enum(top,bottom,middle)";
  };
  children: Array<MjSocialElement | MjRaw>;
}

export interface MjNavbar extends Parent {
  type: "mj-navbar";
  attributes: {
    align: "enum(left,center,right)";
    "base-url": "string";
    hamburger: "string";
    "ico-align": "enum(left,center,right)";
    "ico-open": "string";
    "ico-close": "string";
    "ico-color": "color";
    "ico-font-size": "unit(px,%)";
    "ico-font-family": "string";
    "ico-text-transform": "string";
    "ico-padding": "unit(px,%){1,4}";
    "ico-padding-left": "unit(px,%)";
    "ico-padding-top": "unit(px,%)";
    "ico-padding-right": "unit(px,%)";
    "ico-padding-bottom": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    "padding-left": "unit(px,%)";
    "padding-top": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-bottom": "unit(px,%)";
    "ico-text-decoration": "string";
    "ico-line-height": "unit(px,%,)";
  };
  children: Array<MjNavbarLink | MjRaw>;
}

export interface MjRaw extends End {
  type: "mj-raw";
  attributes: {
    position: "enum(file-start)";
  };
}

export interface MjSelector extends Node {
  type: "mj-preview";
  attributes: {
    path: string;
  };
}

export interface MjHtmlAttributes extends Parent {
  type: "mj-html-attributes";
  children: [MjSelector];
}

export interface MjFont extends Node {
  type: "mj-font";
  attributes: {
    name: "string";
    href: "string";
  };
}

export interface MjAttributes extends Parent {
  type: "mj-attributes";
  children: [Node];
}

export interface MjBreakpoint extends Node {
  type: "mj-breakpoint";
  attributes: {
    width: "unit(px)";
  };
}

export interface MjGroup extends Parent {
  type: "mj-group";
  attributes: {
    "background-color": "color";
    direction: "enum(ltr,rtl)";
    "vertical-align": "enum(top,bottom,middle)";
    width: "unit(px,%)";
  };
  children: Array<MjColumn | MjRaw>;
}

interface MjDivider extends Node {
  type: "mj-divider";
  attributes: {
    "border-color": "color";
    "border-style": "string";
    "border-width": "unit(px)";
    "container-background-color": "color";
    padding: "unit(px,%){1,4}";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    width: "unit(px,%)";
    align: "enum(left,center,right)";
  };
}

export interface MjCarouselImage extends Node {
  type: "mj-carousel-image";
  attributes: {
    alt: "string";
    href: "string";
    rel: "string";
    target: "string";
    title: "string";
    src: "string";
    "thumbnails-src": "string";
    "border-radius": "unit(px,%){1,4}";
    "tb-border": "string";
    "tb-border-radius": "unit(px,%){1,4}";
  };
}

export interface MjCarousel extends Parent {
  type: "mj-carousel";
  attributes: {
    align: "enum(left,center,right)";
    "border-radius": "unit(px,%){1,4}";
    "container-background-color": "color";
    "icon-width": "unit(px,%)";
    "left-icon": "string";
    padding: "unit(px,%){1,4}";
    "padding-top": "unit(px,%)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "right-icon": "string";
    thumbnails: "enum(visible,hidden)";
    "tb-border": "string";
    "tb-border-radius": "unit(px,%)";
    "tb-hover-border-color": "color";
    "tb-selected-border-color": "color";
    "tb-width": "unit(px,%)";
  };
  children: [MjCarouselImage];
}

export interface MjBody extends Parent {
  type: "mj-body";
  attributes: {
    width: "unit(px)";
    "background-color": "color";
  };
  children: Array<MjRaw | MjSection | MjWrapper | MjHero>;
}

export interface MjAccordionText extends End {
  type: "mj-accordion-text";
  attributes: {
    "background-color": "color";
    "font-size": "unit(px)";
    "font-family": "string";
    "font-weight": "string";
    "letter-spacing": "unitWithNegative(px,em)";
    "line-height": "unit(px,%,)";
    color: "color";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
  };
}

export interface MjAccordionTitle extends End {
  type: "mj-accordion-title";
  attributes: {
    "background-color": "color";
    color: "color";
    "font-size": "unit(px)";
    "font-family": "string";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
  };
}

export interface MjAccordionElement extends Parent {
  type: "mj-accordion-element";
  attributes: {
    "background-color": "color";
    border: "string";
    "font-family": "string";
    "icon-align": "enum(top,middle,bottom)";
    "icon-width": "unit(px,%)";
    "icon-height": "unit(px,%)";
    "icon-wrapped-url": "string";
    "icon-wrapped-alt": "string";
    "icon-unwrapped-url": "string";
    "icon-unwrapped-alt": "string";
    "icon-position": "enum(left,right)";
  };
  children: Array<MjAccordionTitle | MjAccordionText | MjRaw>;
}

export interface MjAccordion extends Parent {
  type: "mj-accordion";
  attributes: {
    "container-background-color": "color";
    border: "string";
    "font-family": "string";
    "icon-align": "enum(top,middle,bottom)";
    "icon-width": "unit(px,%)";
    "icon-height": "unit(px,%)";
    "icon-wrapped-url": "string";
    "icon-wrapped-alt": "string";
    "icon-unwrapped-url": "string";
    "icon-unwrapped-alt": "string";
    "icon-position": "enum(left,right)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
  };
  children: [MjAccordionElement, MjRaw];
}

export interface MjButton extends Parent {
  type: "mj-button";
  attributes: {
    align: "enum(left,center,right)";
    "background-color": "color";
    "border-bottom": "string";
    "border-left": "string";
    "border-radius": "string";
    "border-right": "string";
    "border-top": "string";
    border: "string";
    color: "color";
    "container-background-color": "color";
    "font-family": "string";
    "font-size": "unit(px)";
    "font-style": "string";
    "font-weight": "string";
    height: "unit(px,%)";
    href: "string";
    name: "string";
    title: "string";
    "inner-padding": "unit(px,%){1,4}";
    "letter-spacing": "unitWithNegative(px,em)";
    "line-height": "unit(px,%,)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    padding: "unit(px,%){1,4}";
    rel: "string";
    target: "string";
    "text-decoration": "string";
    "text-transform": "string";
    "vertical-align": "enum(top,bottom,middle)";
    "text-align": "enum(left,right,center)";
    width: "unit(px,%)";
  };
  children: [Text];
}

export interface MjText extends Parent {
  type: "mj-text";
  children: Text[];
  attributes: {
    align: "left" | "right" | "center" | "justify";
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
  attributes: {
    "background-color": "color";
    "background-url": "string";
    "background-repeat": "enum(repeat,no-repeat)";
    "background-size": "string";
    "background-position": "string";
    "background-position-x": "string";
    "background-position-y": "string";
    border: "string";
    "border-bottom": "string";
    "border-left": "string";
    "border-radius": "string";
    "border-right": "string";
    "border-top": "string";
    direction: "enum(ltr,rtl)";
    "full-width": "enum(full-width,false,)";
    padding: "unit(px,%){1,4}";
    "padding-top": "unit(px,%)";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "text-align": "enum(left,center,right)";
    "text-padding": "unit(px,%){1,4}";
  };
  children: Array<MjColumn | MjGroup | MjRaw>;
}

export interface MjWrapper extends Omit<MjSection, "type"> {
  type: "mj-wrapper";
}

export interface MjColumn extends Parent {
  type: "mj-column";
  attributes: {
    "background-color": "color";
    border: "string";
    "border-bottom": "string";
    "border-left": "string";
    "border-radius": "unit(px,%){1,4}";
    "border-right": "string";
    "border-top": "string";
    direction: "enum(ltr,rtl)";
    "inner-background-color": "color";
    "padding-bottom": "unit(px,%)";
    "padding-left": "unit(px,%)";
    "padding-right": "unit(px,%)";
    "padding-top": "unit(px,%)";
    "inner-border": "string";
    "inner-border-bottom": "string";
    "inner-border-left": "string";
    "inner-border-radius": "unit(px,%){1,4}";
    "inner-border-right": "string";
    "inner-border-top": "string";
    padding: "unit(px,%){1,4}";
    "vertical-align": "enum(top,bottom,middle)";
    width: "unit(px,%)";
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
