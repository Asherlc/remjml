import { selectAll as uSelectAll } from "unist-util-select";
import { toString } from "mjmlast-util-to-string";
import { remove } from "unist-util-remove";
import type { MjStyle, MjmlNode } from "mjmlast";

export function removeInlineStyles(tree: MjmlNode): string {
  const mjStyleElements = (uSelectAll("mj-style", tree) as MjStyle[]).filter(
    (node: MjStyle) => {
      if (node.attributes?.inline) {
        remove(tree, node);
        return true;
      }

      return false;
    }
  );
  const stylesheets = mjStyleElements.map(toString).join("\n");

  return stylesheets;
}
