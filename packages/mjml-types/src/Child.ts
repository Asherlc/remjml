import type { MjAccordion } from "./mj-accordion";
import type { MjAccordionElement } from "./mj-accordion-element";
import type { MjAccordionText } from "./mj-accordion-text";
import type { MjAccordionTitle } from "./mj-accordion-title";
import type { MjBody } from "./mj-body";
import type { MjButton } from "./mj-button";
import type { MjCarousel } from "./mj-carousel";
import type { MjCarouselImage } from "./mj-carousel-image";
import type { MjColumn } from "./mj-column";
import type { MjDivider } from "./mj-divider";
import type { MjGroup } from "./mj-group";
import type { MjHead } from "./mj-head";
import type { MjHero } from "./mj-hero";
import type { MjHtmlAttributes } from "./mj-html-attributes";
import type { MjImage } from "./mj-image";
import type { MjNavbar } from "./mj-navbar";
import type { MjNavbarLink } from "./mj-navbar-link";
import type { MjPreview } from "./mj-preview";
import type { MjRaw } from "./mj-raw";
import type { MjSection } from "./mj-section";
import type { MjSelector } from "./mj-selector";
import type { MjSocial } from "./mj-social";
import type { MjSocialElement } from "./mj-social-element";
import type { MjSpacer } from "./mj-spacer";
import type { MjStyle } from "./mj-style";
import type { MjTable } from "./mj-table";
import type { MjText } from "./mj-text";
import type { MjTitle } from "./mj-title";
import type { MjWrapper } from "./mj-wrapper";

export type Child =
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
