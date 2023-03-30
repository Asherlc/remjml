import { MjImageAttributes } from "mjmlast";

export const DEFAULT_ATTRIBUTES: Pick<
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
