import { Element as HElement } from "hast";
import { h } from "hastscript";
import { compact, isEmpty } from "lodash-es";
import { MediaQueries } from "../types";

const THUNDERBIRD_CLASS_NAME = `moz-text-html`;

export function mediaQueries(
  classNamesToMediaQueries: MediaQueries,
  breakpoint: string,
  forceOWADesktop: boolean
): HElement[] | undefined {
  if (isEmpty(classNamesToMediaQueries)) {
    return undefined;
  }

  const baseMediaQueries = Object.entries(classNamesToMediaQueries).map(
    ([className, mediaQuery]) => `.${className} ${mediaQuery}`
  );
  const thunderbirdMediaQueries = Object.entries(classNamesToMediaQueries).map(
    ([className, mediaQuery]) =>
      `.${THUNDERBIRD_CLASS_NAME} .${className} ${mediaQuery}`
  );
  const owaQueries = baseMediaQueries.map((mq) => `[owa] ${mq}`);

  return compact([
    h(
      "style",
      {
        type: "text/css",
      },
      `
    @media only screen and (min-width:${breakpoint}) {
      ${baseMediaQueries.join("\n")}
    }
    `
    ),
    h(
      "style",
      {
        media: `screen and (min-width:${breakpoint})`,
      },
      thunderbirdMediaQueries.join("\n")
    ),
    forceOWADesktop
      ? h("style", { type: "text/css" }, owaQueries.join("\n"))
      : undefined,
  ]);
}
