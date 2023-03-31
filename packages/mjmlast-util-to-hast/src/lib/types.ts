import type { Root as HRoot, Parent as HParent } from "hast";
import type { MjHead, MjmlNode } from "mjmlast";
import type { Properties } from "csstype";

export type HastNode = HRoot | HParent | HParent["children"][number];
type DefaultAttributes = Partial<
  Record<MjmlNode["type"], Record<string, string>>
>;
type CssClasses = Record<string, Properties>;
export type MediaQueries = {
  [className: string]: string;
};

export type Context = {
  containerWidth?: string;
  mobileWidth?: string;
  mjHead: MjHead;
  mediaQueries: MediaQueries;
  fullWidth?: boolean;
  defaultAttributes?: DefaultAttributes;
  cssClasses: CssClasses;
};
