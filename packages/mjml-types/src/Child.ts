import { MjSection } from "./MjSection";
import { MjText } from "./MjText";
import { MjWrapper } from "./MjWrapper";
import { MjAccordion } from "./mj-accordion";
import { MjAccordionElement } from "./mj-accordion-element";
import { MjAccordionText } from "./mj-accordion-text";
import { MjAccordionTitle } from "./mj-accordion-title";
import MjBody from "./mj-body";
import { MjButton } from "./mj-button";
import { MjCarousel } from "./mj-carousel";
import { MjCarouselImage } from "./mj-carousel-image";
import { MjColumn } from "./mj-column";
import { MjDivider } from "./mj-divider";
import { MjGroup } from "./mj-group";

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
  | Text
  | MjSelector;
