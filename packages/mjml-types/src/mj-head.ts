import { ParentComponent } from "./ParentComponent";
import MjHtmlAttributes from "./mj-html-attributes";
import { MjBreakpoint } from "./mj-breakpoint";
import { MjFont } from "./mj-font";
import { MjPreview, MjStyle, MjTitle } from "mjmlast";

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
