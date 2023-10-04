import { defaultAttributes } from "./defaultAttributes";
import { isTypeWithDefaultAttributes } from "./isTypeWithDefaultAttributes";

export function getDefaultAttributes(type: string): Record<string, string> {
  if (isTypeWithDefaultAttributes(type)) {
    return defaultAttributes[type];
  }

  return {};
}
