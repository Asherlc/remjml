// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/inline-style-parser.d.ts" />
import type { Root as HRoot, Element as HElement } from "hast";
import { selectAll as hSelectAll } from "hast-util-select";
import css from "css";
import type { Stylesheet } from "css";
import { isElement } from "hast-util-is-element";
import { applyDeclaration } from "./applyDeclaration";
import { getInlineCssFromElement } from "./getInlineCssFromElement";
import { stringifyCssDeclarations } from "./stringifyCssDeclaration";

export function applyInlineStyles(tree: HRoot, stylesheet: string): void {
  const cast: Stylesheet = css.parse(stylesheet);
  for (const rule of cast.stylesheet?.rules ?? []) {
    if (!("selectors" in rule)) {
      continue;
    }

    for (const selector of rule.selectors ?? []) {
      const elements: HElement[] = hSelectAll(selector, tree);

      for (const elem of elements) {
        let elemInlineCss: css.Declaration[] = getInlineCssFromElement(elem);

        for (const declaration of rule.declarations ?? []) {
          if (!("property" in declaration && isElement(elem))) {
            continue;
          }

          elemInlineCss = applyDeclaration(elemInlineCss, declaration);
        }

        elem.properties.style = stringifyCssDeclarations(elemInlineCss);
      }
    }
  }
}
