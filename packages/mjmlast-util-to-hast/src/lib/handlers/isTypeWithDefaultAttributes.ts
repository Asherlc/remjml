import { defaultAttributes } from "./defaultAttributes";

export function isTypeWithDefaultAttributes(
  type: string
): type is keyof typeof defaultAttributes {
  return type in defaultAttributes;
}
