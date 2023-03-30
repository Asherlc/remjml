import type { Properties } from "csstype";

function jsonPropertyNameToCssPropertyName(jsonPropertyName: string): string {
  return jsonPropertyName.replace(
    /[A-Z]/g,
    (match) => `-${match.toLowerCase()}`
  );
}

export type CssPropertiesWithWeirdEmail = Properties & {
  "mso-hide"?: string;
  "-moz-user-select"?: string;
  "user-select"?: string;
  align?: string;
};

export function jsonToCss(properties: CssPropertiesWithWeirdEmail): string {
  const styleString = Object.entries(properties)
    .filter(([, value]) => {
      return Boolean(value);
    })
    .map(
      ([property, value]) =>
        `${jsonPropertyNameToCssPropertyName(property)}:${value}`
    )
    .join(";");

  return styleString;
}
