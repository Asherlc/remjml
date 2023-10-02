import type { Element as HElement } from "hast";
import type { DisplayType } from "./types";
import { DownlevelHidden } from "./DownlevelHidden";
import { DownlevelRevealed } from "./DownlevelRevealed";
import type { ConditionalCommentConstructor } from "./ConditionalComment";

export const MSO_OR_IE = "mso | IE";
export const NOT_MSO_OR_IE = "!mso | IE";

type ConditionalCommentType = "downlevel-hidden" | "downlevel-revealed";

type Attributes = {
  expression: string;
  type: ConditionalCommentType;
  display?: DisplayType;
};

const TYPE_TO_BUILDER_MAP: Record<
  ConditionalCommentType,
  ConditionalCommentConstructor
> = {
  "downlevel-hidden": DownlevelHidden,
  "downlevel-revealed": DownlevelRevealed,
};

export function conditionalComment(
  { expression, type, display }: Attributes,
  children: HElement[] | HElement
): HElement[] {
  const conditionalComment = new TYPE_TO_BUILDER_MAP[type](
    expression,
    children,
    display
  );

  return conditionalComment.toAst();
}
