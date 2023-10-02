import { ParentComponent } from "./ParentComponent";
import { MjImage } from "./mj-image";
import { MjTitle } from "./mj-title";
import { MjNavbarLink } from "./mj-navbar-link";
import { MjHead } from "./mj-head";
import { MjStyle } from "./mj-style";
import { MjPreview } from "./mj-preview";
import { MjSocialElement } from "./mj-social-element";
import { MjSpacer } from "./mj-spacer";
import { MjTable } from "./mj-table";
import { MjRaw } from "./mj-raw";
import { MjSocial } from "./mj-social";
import { MjNavbar } from "./mj-navbar";
import { MjSelector } from "./mj-selector";
import { MjHtmlAttributes } from "./mj-html-attributes";
import { MjDivider } from "./mj-divider";
import { MjCarouselImage } from "./mj-carousel-image";
import { MjCarousel } from "./mj-carousel";
import { MjColumn } from "./mj-column";
import { MjSection } from "./mj-section";
import { MjBody } from "./mj-body";
import { MjAccordionText } from "./mj-accordion-text";
import { MjAccordionTitle } from "./mj-accordion-title";
import { MjAccordionElement } from "./mj-accordion-element";
import { MjButton } from "./mj-button";
import { MjText } from "./mj-text";
import { MjGroup } from "./mj-group";
import { MjWrapper } from "./mj-wrapper";
import { MjHero } from "./mj-hero";
import { MjAccordion } from "mjmlast";

type Child =
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

export interface MjAttributes extends ParentComponent {
  children: Child[];
  tagName: "mj-attributes";
}
