import { mjDivider } from "./mj-divider";
import { mjBody } from "./mj-body";
import { mjNavbar } from "./mj-navbar";
import { mjNavbarLink } from "./mj-navbar-link";
import { mjColumn } from "./mj-column/mj-column";
import { mjSection } from "./mj-section";
import { mjImage } from "./mj-image";
import { mjText } from "./mj-text";
import { mjButton } from "./mj-button";
import { mjGroup } from "./mj-group/mj-group";
import { text } from "./text";
import { mjml } from "./mjml";

export const defaultHandlers = {
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
