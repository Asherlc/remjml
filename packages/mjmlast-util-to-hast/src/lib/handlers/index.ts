import { mjml } from "./mjml";
import {
  mjDivider,
  DEFAULT_ATTRIBUTES as MJ_DIVIDER_DEFAULT_ATTRIBUTES,
} from "./mj-divider";
import { text } from "./text";
import { mjBody } from "./mj-body";
import { mjNavbar } from "./mj-navbar";
import { mjNavbarLink } from "./mj-navbar-link";
import { mjColumn } from "./mj-column/mj-column";
import { mjSection } from "./mj-section";
import {
  mjImage,
  DEFAULT_ATTRIBUTES as MJ_IMAGE_DEFAULT_ATTRIBUTES,
} from "./mj-image";
import {
  mjText,
  DEFAULT_ATTRIBUTES as MJ_TEXT_DEFAULT_ATTRIBUTES,
} from "./mj-text";
import {
  mjButton,
  DEFAULT_ATTRIBUTES as MJ_BUTTON_DEFAULT_ATTRIBUTES,
} from "./mj-button";
import { mjGroup } from "./mj-group/mj-group";

export const defaultAttributes = {
  "mj-text": MJ_TEXT_DEFAULT_ATTRIBUTES,
  "mj-image": MJ_IMAGE_DEFAULT_ATTRIBUTES,
  "mj-divider": MJ_DIVIDER_DEFAULT_ATTRIBUTES,
  "mj-button": MJ_BUTTON_DEFAULT_ATTRIBUTES,
} as const;

export const handlers = {
  text,
  "mj-body": mjBody,
  "mj-section": mjSection,
  "mj-column": mjColumn,
  "mj-image": mjImage,
  "mj-text": mjText,
  "mj-divider": mjDivider,
  "mj-navbar": mjNavbar,
  "mj-navbar-link": mjNavbarLink,
  "mj-button": mjButton,
  "mj-group": mjGroup,
  mjml,
} as const;

function isTypeWithDefaultAttributes(
  type: string
): type is keyof typeof defaultAttributes {
  return type in defaultAttributes;
}

export function getDefaultAttributes(type: string): Record<string, string> {
  if (isTypeWithDefaultAttributes(type)) {
    return defaultAttributes[type];
  }

  return {};
}
