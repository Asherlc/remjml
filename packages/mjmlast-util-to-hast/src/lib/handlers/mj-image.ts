import { BoxWidths } from "../helpers/get-box-widths";
import { min } from "lodash-es";
import type { MjImage, MjHero, MjColumn, MjImageAttributes } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../helpers/json-to-css";
import { Width } from "../helpers/width-parser";

const DEFAULT_ATTRIBUTES: Pick<
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

function getContentWidth(
  attributes: MjImageAttributes,
  context: Context
): number {
  const width: Width = attributes.width
    ? new Width(attributes.width)
    : new Width(Infinity);

  const { box } = new BoxWidths(attributes, width);

  return min([box, width.width]) as number;
}

export function mjImage(
  node: MjImage,
  parent: ImageParent,
  options: Options,
  context: Context
): HElement {
  const attributes = { ...DEFAULT_ATTRIBUTES, ...node.attributes };

  const height = attributes.height;
  const contentWidth = getContentWidth(attributes, context);

  const width = context.containerWidth;

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
    width: contentWidth,
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
        minWidth: width ? "100%" : undefined,
        maxWidth: width ? "100%" : undefined,
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
            },
            [wrappedHImage]
          ),
        ]),
      ]),
    ]
  );

  return addPosition(node, hNode);
}
