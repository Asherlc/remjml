import { DEFAULT_ATTRIBUTES as MJ_DIVIDER_DEFAULT_ATTRIBUTES } from "./mj-divider";
import { DEFAULT_ATTRIBUTES as MJ_IMAGE_DEFAULT_ATTRIBUTES } from "./mj-image";
import { DEFAULT_ATTRIBUTES as MJ_TEXT_DEFAULT_ATTRIBUTES } from "./mj-text";
import { DEFAULT_ATTRIBUTES as MJ_BUTTON_DEFAULT_ATTRIBUTES } from "./mj-button";

export const defaultAttributes = {
  "mj-text": MJ_TEXT_DEFAULT_ATTRIBUTES,
  "mj-image": MJ_IMAGE_DEFAULT_ATTRIBUTES,
  "mj-divider": MJ_DIVIDER_DEFAULT_ATTRIBUTES,
  "mj-button": MJ_BUTTON_DEFAULT_ATTRIBUTES,
} as const;
