export const SHORTHAND_PROPERTIES = {
  "list-style": ["list-type", "list-position", "list-image"],
  margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
  outline: ["outline-width", "outline-style", "outline-color"],
  padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],

  background: [
    "background-image",
    "background-position",
    "background-size",
    "background-repeat",
    "background-origin",
    "background-clip",
    "background-attachment",
    "background-color",
  ],
  "background-position": ["background-position-x", "background-position-y"],

  border: ["border-width", "border-style", "border-color"],
  "border-color": [
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
  ],
  "border-style": [
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
  ],
  "border-width": [
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
  ],
  "border-top": ["border-top-width", "border-top-style", "border-top-color"],
  "border-right": [
    "border-right-width",
    "border-right-style",
    "border-right-color",
  ],
  "border-bottom": [
    "border-bottom-width",
    "border-bottom-style",
    "border-bottom-color",
  ],
  "border-left": [
    "border-left-width",
    "border-left-style",
    "border-left-color",
  ],
  "border-radius": [
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
  ],
  "border-image": [
    "border-image-source",
    "border-image-slice",
    "border-image-width",
    "border-image-outset",
    "border-image-repeat",
  ],

  font: [
    "font-style",
    "font-variant",
    "font-weight",
    "font-stretch",
    "font-size",
    "fontline-height",
    "font-family",
  ],
  "font-variant": [
    "font-variant-ligatures",
    "font-variant-alternates",
    "font-variant-caps",
    "font-variant-numeric",
    "font-variant-east-asian",
  ],
  flex: ["flex-grow", "flex-shrink", "flex-basis"],
  "flex-flow": ["flex-direction", "flex-wrap"],

  grid: [
    "grid-template-rows",
    "grid-template-columns",
    "grid-template-areas",
    "grid-auto-rows",
    "grid-auto-columns",
    "grid-auto-flow",
  ],
  "grid-template": [
    "grid-template-rows",
    "grid-template-columns",
    "grid-template-areas",
  ],
  "grid-row": ["grid-row-start", "grid-row-end"],
  "grid-column": ["grid-column-start", "grid-column-end"],
  "grid-area": [
    "grid-row-start",
    "grid-column-start",
    "grid-row-end",
    "grid-column-end",
  ],
  "grid-gap": ["grid-row-gap", "grid-column-gap"],

  mask: [
    "mask-image",
    "mask-mode",
    "mask-position",
    "mask-size",
    "mask-repeat",
    "mask-origin",
    "mask-clip",
  ],
  "mask-border": [
    "mask-border-source",
    "mask-border-slice",
    "mask-border-width",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-mode",
  ],

  columns: ["column-width", "column-count"],
  "column-rule": [
    "column-rule-width",
    "column-rule-style",
    "column-rule-color",
  ],

  "scroll-padding": [
    "scroll-padding-top",
    "scroll-padding-right",
    "scroll-padding-bottom",
    "scroll-padding-left",
  ],
  "scroll-padding-block": [
    "scroll-padding-block-start",
    "scroll-padding-block-end",
  ],
  "scroll-padding-inline": [
    "scroll-padding-inline-start",
    "scroll-padding-inline-end",
  ],
  "scroll-snap-margin": [
    "scroll-snap-margin-top",
    "scroll-snap-margin-right",
    "scroll-snap-margin-bottom",
    "scroll-snap-margin-left",
  ],
  "scroll-snap-margin-block": [
    "scroll-snap-margin-block-start",
    "scroll-snap-margin-block-end",
  ],
  "scroll-snap-margin-inline": [
    "scroll-snap-margin-inline-start",
    "scroll-snap-margin-inline-end",
  ],

  cue: ["cue-before", "cue-after"],
  pause: ["pause-before", "pause-after"],
  rest: ["rest-before", "rest-after"],
  "text-decoration": [
    "text-decoration-line",
    "text-decoration-style",
    "text-decoration-color",
  ],
  "text-emphasis": ["text-emphasis-style", "text-emphasis-color"],
  animation: [
    "animation-name",
    "animation-duration",
    "animation-timing-function",
    "animation-delay",
    "animation-iteration-count",
    "animation-direction",
    "animation-fill-mode",
    "animation-play-state",
  ],
  transition: [
    "transition-property",
    "transition-duration",
    "transition-timing-function",
    "transition-delay",
  ],
};

export function isLonghand(property: string): boolean {
  for (const [, longhands] of Object.entries(SHORTHAND_PROPERTIES)) {
    if (longhands.includes(property)) {
      return true;
    }
  }

  return false;
}

export function shorthandsFor(property: string): string[] {
  const shorthands: string[] = [];

  for (const [shorthand, longhands] of Object.entries(SHORTHAND_PROPERTIES)) {
    if (longhands.includes(property)) {
      shorthands.push(shorthand);

      shorthands.unshift(...shorthandsFor(shorthand));
    }
  }

  return shorthands;
}
