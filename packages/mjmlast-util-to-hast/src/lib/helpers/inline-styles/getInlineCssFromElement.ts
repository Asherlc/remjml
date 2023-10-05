// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/inline-style-parser.d.ts" />
import parseInlineCss from "inline-style-parser";
import type css from "css";
import type { Element as HElement, Properties as HProperties } from "hast";

export function getInlineCssFromElement(elem: HElement): css.Declaration[] {
  const styleProperty: HProperties[string] = elem.properties.style;

  if (!styleProperty) {
    return [];
  }

  if (typeof styleProperty !== "string") {
    throw new Error(
      `Style property must be a string or undefined (${styleProperty})`
    );
  }

  return parseInlineCss(styleProperty);
}
