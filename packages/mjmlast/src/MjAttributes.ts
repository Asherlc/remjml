import type { ParentComponent } from "./ParentComponent";
import type { MjPreview } from "./MjPreview";
import type { MjImage } from "./MjImage";
import type { MjStyle } from "./MjStyle";
import type { MjHead } from "./MjHead";
import type { MjTitle } from "./MjTitle";
import type { MjNavbarLink } from "./MjNavbarLink";
import type { MjSocialElement } from "./MjSocialElement";
import type { MjSpacer } from "./MjSpacer";
import type { MjTable } from "./MjTable";
import type { MjRaw } from "./MjRaw";
import type { MjSocial } from "./MjSocial";
import type { MjNavbar } from "./MjNavbar";
import type { MjSelector } from "./MjSelector";
import type { MjHtmlAttributes } from "./MjHtmlAttributes";
import type { MjDivider } from "./MjDivider";
import type { MjCarouselImage } from "./MjCarouselImage";
import type { MjCarousel } from "./MjCarousel";
import type { MjBody } from "./MjBody";
import type { MjAccordionText } from "./MjAccordionText";
import type { MjAccordionTitle } from "./MjAccordionTitle";
import type { MjAccordionElement } from "./MjAccordionElement";
import type { MjAccordion } from "./MjAccordion";
import type { MjButton } from "./MjButton";
import type { MjText } from "./MjText";
import type { MjColumn } from "./MjColumn";
import type { MjGroup } from "./MjGroup";
import type { MjSection } from "./MjSection";
import type { MjWrapper } from "./MjWrapper";
import type { MjHero } from "./MjHero";
import type { MjClass } from "./MjClass";
import type { MjAll } from "./MjAll";

type Child =
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

export interface MjAttributes extends ParentComponent {
  attributes: never;
  children: Child[];
  type: "mj-attributes";
}
