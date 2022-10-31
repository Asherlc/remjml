import { text } from "./text";
import { mjBody } from "./mj-body";
import { mjColumn } from "./mj-column";
import { mjSection } from "./mj-section";
import { mjImage } from "./mj-image";

export const handlers = {
  text,
  "mj-body": mjBody,
  "mj-section": mjSection,
  "mj-column": mjColumn,
  "mj-image": mjImage,
};
