export const componentTypes = new Set([
  "mj-class",
  "mj-attributes",
  "mj-breakpoint",
  "mj-font",
  "mj-html-attributes",
  "mj-preview",
  "mj-style",
  "mj-title",
  "mjml",
  "mj-head",
  "mj-body",
  "mj-accordion",
  "mj-button",
  "mj-carousel",
  "mj-carousel-image",
  "mj-column",
  "mj-divider",
  "mj-group",
  "mj-hero",
  "mj-image",
  "mj-navbar",
  "mj-navbar-link",
  "mj-raw",
  "mj-section",
  "mj-social",
  "mj-social-element",
  "mj-spacer",
  "mj-table",
  "mj-text",
  "mj-wrapper",
]);

export const nodeTypes = new Set([...Array.from(componentTypes), "text"]);
