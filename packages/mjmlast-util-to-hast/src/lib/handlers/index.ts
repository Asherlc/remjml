import { text } from "./text";
import { mjBody } from "./mj-body";
import { mjColumn } from "./mj-column";
import { mjSection } from "./mj-section";
import { mjImage } from "./mj-image";
import { Handler, Handlers } from "..";

export const handlers: Handlers = {
  text: text as Handler,
  "mj-body": mjBody as Handler,
  "mj-section": mjSection as Handler,
  "mj-column": mjColumn as Handler,
  "mj-image": mjImage as Handler,
};
