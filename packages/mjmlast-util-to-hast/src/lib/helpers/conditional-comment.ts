import { Element as HElement } from "hast";
import { h } from "hastscript";
import { castArray } from "lodash-es";
import type { Node } from "unist";
import { Literal, u } from "unist-builder";

type ConditionalCommentType = "downlevel-hidden" | "downlevel-revealed";
type ConditionalCommentSide = "begin" | "end";

function beginConditionalCommentString(
  expression: string,
  type: ConditionalCommentType
): string {
  if (type === "downlevel-hidden") {
    return `<!--[if ${expression}]>`;
  } else if (type === "downlevel-revealed") {
    return `<![if ${expression}]>`;
  }

  throw new Error(`Unknown conditional comment type ${type}`);
}

function endConditionalCommentString(type: ConditionalCommentType): string {
  if (type === "downlevel-hidden") {
    return `<![endif]-->`;
  } else if (type === "downlevel-revealed") {
    return `<![endif]>`;
  }

  throw new Error(`Unknown conditional comment type ${type}`);
}

export function beginConditionalComment({
  expression,
  type,
}: {
  expression: string;
  type: ConditionalCommentType;
}): HElement {
  return u(
    "raw",
    beginConditionalCommentString(expression, type)
  ) as unknown as HElement;
}

export function endConditionalComment({
  type,
}: {
  type: ConditionalCommentType;
}): HElement {
  return u("raw", endConditionalCommentString(type)) as unknown as HElement;
}

type Attributes = { expression: string; type: ConditionalCommentType };

export function conditionalComment(
  { expression, type }: Attributes,
  children: HElement[] | HElement
): HElement[] {
  const begin = beginConditionalComment({ expression, type });
  const end = endConditionalComment({ type });

  const ensuredChildren = children ? castArray(children) : [];

  return [begin, ...ensuredChildren, end];
}
