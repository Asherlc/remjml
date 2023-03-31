import type { Root as HRoot } from "hast";
import { selectAll as uSelectAll } from "unist-util-select";
import { selectAll as hSelectAll } from "hast-util-select";
import { toString } from "mjmlast-util-to-string";
import css from "css";
import { remove } from "unist-util-remove";
import { isElement } from "hast-util-is-element";
import type { MjStyle, MjmlNode } from "mjmlast";

export function removeInlineStyles(tree: MjmlNode): string {
  const mjStyleElements = (uSelectAll("mj-style", tree) as MjStyle[]).filter(
    (node: MjStyle) => {
      if (node.attributes?.inline) {
        remove(tree, node as any);
        return true;
      }

      return false;
    }
  );
  const stylesheets = mjStyleElements.map(toString).join("\n");

  return stylesheets;
}

export function applyInlineStyles(tree: HRoot, stylesheet: string) {
  const cast = css.parse(stylesheet);
  for (const rule of cast.stylesheet?.rules ?? []) {
    if (!("selectors" in rule)) {
      continue;
    }

    for (const selector of rule.selectors ?? []) {
      const elems = hSelectAll(selector, tree);

      for (const elem of elems) {
        for (const declaration of rule.declarations ?? []) {
          if (!("property" in declaration && isElement(elem))) {
            continue;
          }

          elem.properties ??= {};
          elem.properties.style ??= "";
          if (/[^;]\s*$/.test(elem.properties.style as string)) {
            elem.properties.style += ";";
          }
          elem.properties.style += `${declaration.property}:${declaration.value};`;
        }
      }
    }
  }
}
