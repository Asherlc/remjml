// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../../../../types/units-css.d.ts" />
import units from "units-css";
import type { MjImage, MjHero, MjColumn } from "mjmlast";
import { h } from "hastscript";
import { addPosition, Context, Options } from "../..";
import { Element as HElement } from "hast";
import { jsonToCss } from "../../helpers/json-to-css";
import { DEFAULT_ATTRIBUTES } from "./default-attributes";
import { ContentWidth } from "./ContentWidth";
import { Attributes } from "../../helpers/Attributes";

type ImageParent = MjHero | MjColumn;

export function mjImage(
  node: MjImage,
  parent: ImageParent,
  options: Options,
  context: Context
): HElement {
  if (!context.containerWidth) {
    throw new Error(`No containerWidth`);
  }

  const attributes = new Attributes(
    node.attributes || {},
    context.defaultAttributes?.["mj-image"] || {},
    context.defaultAttributes?.["mj-all"] || {},
    DEFAULT_ATTRIBUTES
  );

  const height: string | undefined = attributes.get("height");
  const contentWidth: ContentWidth = new ContentWidth(
    units.parse(context.containerWidth),
    attributes.toHash()
  );

  const hImage = h("image", {
    alt: attributes.get("alt"),
    height: height && (height === "auto" ? height : parseInt(height, 10)),
    src: attributes.get("src"),
    srcset: attributes.get("srcset"),
    sizes: attributes.get("sizes"),
    style: jsonToCss({
      border: attributes.get("border"),
      borderLeft: attributes.get("border-left"),
      borderRight: attributes.get("border-right"),
      borderTop: attributes.get("border-top"),
      borderBottom: attributes.get("border-bottom"),
      borderRadius: attributes.get("border-radius"),
      display: "block",
      outline: "none",
      textDecoration: "none",
      height: attributes.get("height"),
      maxHeight: attributes.get("max-height"),
      width: "100%",
      fontSize: attributes.get("font-size"),
    }),
    title: attributes.get("title"),
    width: "100%",
    usemap: attributes.get("usemap"),
  });

  const wrappedHImage = attributes.get("href")
    ? h(
        "a",
        {
          href: attributes.get("href"),
          target: attributes.get("target"),
          rel: attributes.get("rel"),
          name: attributes.get("name"),
          title: attributes.get("title"),
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
      class: attributes.get("fluid-on-mobile")
        ? "mj-full-width-mobile"
        : undefined,
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
              class: attributes.get("fluid-on-mobile")
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
