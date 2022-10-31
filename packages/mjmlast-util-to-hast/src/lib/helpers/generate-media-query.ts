export function generateMediaQuery(width: number, unit: string): string {
  return `{ width:${width}${unit} !important; max-width: ${width}${unit}; }`;
}
