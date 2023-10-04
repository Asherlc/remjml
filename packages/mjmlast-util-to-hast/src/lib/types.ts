import type { Root as HRoot, Parent as HParent } from "hast";
import type { BaseAttributes, MjHead } from "mjmlast";

export type HastNode = HRoot | HParent | HParent["children"][number];

export type MediaQueries = {
  [className: string]: string;
};

export type MjClassesAttributes = Record<string, BaseAttributes>;

export type Context = {
  containerWidth?: string;
  mobileWidth?: string;
  mjHead: MjHead;
  mediaQueries: MediaQueries;
  fullWidth?: boolean;
  navbarBaseUrl: string | undefined;
  mjClasses: MjClassesAttributes;
};
