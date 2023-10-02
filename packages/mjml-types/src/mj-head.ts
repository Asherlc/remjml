import { ParentComponent } from "./ParentComponent";
import { MjHtmlAttributes } from "./mj-html-attributes";
import { MjBreakpoint } from "./mj-breakpoint";
import { MjFont } from "./mj-font";
import { MjAttributes } from "./mj-attributes";
import { MjPreview } from "./mj-preview";
import { MjTitle } from "./mj-title";
import { MjStyle } from "./mj-style";

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
