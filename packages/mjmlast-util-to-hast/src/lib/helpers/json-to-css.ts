import type { Properties } from "csstype";

function jsonPropertyNameToCssPropertyName(jsonPropertyName: string): string {
  return jsonPropertyName.replace(
    /[A-Z]/g,
    (match) => `-${match.toLowerCase()}`
  );
}

export function jsonToCss(properties: Properties): string {
  const styleString = Object.entries(properties)
    .filter(([_key, value]) => {
      return Boolean(value);
    })
    .map(
      ([property, value]) =>
        `${jsonPropertyNameToCssPropertyName(property)}:${value}`
    )
    .join(";");

  return styleString;
}
