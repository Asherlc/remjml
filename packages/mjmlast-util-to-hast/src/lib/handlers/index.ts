import type { Attributes } from "mjml-types";
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
import type { Handler, Handlers } from "..";
import {
  mjButton,
  DEFAULT_ATTRIBUTES as MJ_BUTTON_DEFAULT_ATTRIBUTES,
} from "./mj-button";

export const defaultAttributes: Record<string, Attributes> = {
  "mj-text": MJ_TEXT_DEFAULT_ATTRIBUTES,
  "mj-image": MJ_IMAGE_DEFAULT_ATTRIBUTES,
  "mj-divider": MJ_DIVIDER_DEFAULT_ATTRIBUTES,
  "mj-button": MJ_BUTTON_DEFAULT_ATTRIBUTES,
};

export const handlers: Handlers = {
  text: text as unknown as Handler,
  "mj-body": mjBody as unknown as Handler,
  "mj-section": mjSection as unknown as Handler,
  "mj-column": mjColumn as unknown as Handler,
  "mj-image": mjImage as unknown as Handler,
  "mj-text": mjText as unknown as Handler,
  "mj-divider": mjDivider as unknown as Handler,
  "mj-navbar": mjNavbar as unknown as Handler,
  "mj-navbar-link": mjNavbarLink as unknown as Handler,
  "mj-button": mjButton as unknown as Handler,
  mjml: mjml as unknown as Handler,
};
