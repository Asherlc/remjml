import type { ParentComponent } from "./ParentComponent";
import type { MjHtmlAttributes } from "./mj-html-attributes";
import type { MjBreakpoint } from "./mj-breakpoint";
import type { MjFont } from "./mj-font";
import type { MjAttributes } from "./mj-attributes";
import type { MjPreview } from "./mj-preview";
import type { MjTitle } from "./mj-title";
import type { MjStyle } from "./mj-style";

export interface MjHead extends ParentComponent {
  tagName: "mj-head";
  children: (
    | MjAttributes
    | MjBreakpoint
    | MjFont
    | MjHtmlAttributes
    | MjPreview
    | MjStyle
    | MjTitle
  )[];
}
