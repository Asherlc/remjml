import type { ElementContent as HContent } from "hast";
import { pointStart, pointEnd } from "unist-util-position";
import type { MjmlNode } from "mjmlast";

export function addPosition<Right extends HContent>(
  left: MjmlNode | undefined | null,
  right: Right
): Right {
  if (left && "position" in left) {
    return {
      ...right,
      position: { start: pointStart(left), end: pointEnd(left) },
    };
  }

  return right;
}
