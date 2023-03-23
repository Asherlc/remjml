// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../types/units-css.d.ts" />
import units, { Parts } from "units-css";
import { BoxWidth } from "../helpers/BoxWidth";
import { minBy } from "lodash-es";
import type { MjImage, MjHero, MjColumn, MjImageAttributes } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";

export const DEFAULT_ATTRIBUTES: Pick<
  MjImageAttributes,
  "align" | "border" | "height" | "padding" | "target" | "font-size"
> = {
  align: "center",
  border: "0",
  height: "auto",
  padding: "10px 25px",
  target: "_blank",
  "font-size": "13px",
};

type ImageParent = MjHero | MjColumn;

class ContentWidth {
  #containerWidth: Parts;
  #attributes: MjImageAttributes;

  constructor(containerWidth: Parts, attributes: Record<string, string>) {
    this.#containerWidth = containerWidth;
    this.#attributes = attributes;
  }

  get #nodeWidth(): Parts {
    return this.#attributes.width
      ? units.parse(this.#attributes.width)
      : units.parse(Infinity);
  }

  get #boxWidth(): BoxWidth {
    return new BoxWidth(this.#attributes, this.#containerWidth);
  }

  get width(): Parts {
    return minBy<Parts>([this.#boxWidth.box, this.#nodeWidth], "value")!;
  }

  toString(): string {
    return `${this.width}px`;
  }
}

export function mjImage(
  node: MjImage,
  parent: ImageParent,
  options: Options,
  context: Context
): HElement {
  if (!context.containerWidth) {
    throw new Error(`No containerWidth`);
  }

  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const height: string | undefined = attributes.height;
  const contentWidth: ContentWidth = new ContentWidth(
    units.parse(context.containerWidth),
    attributes
  );

  const hImage = h("image", {
    alt: attributes.alt,
    height: height && (height === "auto" ? height : parseInt(height, 10)),
    src: attributes.src,
    srcset: attributes.srcset,
    sizes: attributes.sizes,
    style: jsonToCss({
      border: attributes.border,
      borderLeft: attributes["border-left"],
      borderRight: attributes["border-right"],
      borderTop: attributes["border-top"],
      borderBottom: attributes["border-bottom"],
      borderRadius: attributes["border-radius"],
      display: "block",
      outline: "none",
      textDecoration: "none",
      height: attributes.height,
      maxHeight: attributes["max-height"],
      width: "100%",
      fontSize: attributes["font-size"],
    }),
    title: attributes.title,
    width: "100%",
    usemap: attributes.usemap,
  });

  const wrappedHImage = attributes.href
    ? h(
        "a",
        {
          href: attributes.href,
          target: attributes.target,
          rel: attributes.rel,
          name: attributes.name,
          title: attributes.title,
        },
        [hImage]
      )
    : hImage;

  const hNode = h(
    "table",
    {
      border: "0",
      cellpadding: "0",
      cellspacing: "0",
      role: "presentation",
      class: attributes["fluid-on-mobile"] ? "mj-full-width-mobile" : undefined,
      style: jsonToCss({
        minWidth: context.fullWidth ? "100%" : undefined,
        maxWidth: context.fullWidth ? "100%" : undefined,
        borderCollapse: "collapse",
        borderSpacing: "0px",
      }),
    },
    [
      h("tbody", [
        h("tr", [
          h(
            "td",
            {
              class: attributes["fluid-on-mobile"]
                ? "mj-full-width-mobile"
                : undefined,
              style: jsonToCss({
                width: context.fullWidth ? undefined : contentWidth.toString(),
              }),
            },
            [wrappedHImage]
          ),
        ]),
      ]),
    ]
  );

  return addPosition(node, hNode);
}
