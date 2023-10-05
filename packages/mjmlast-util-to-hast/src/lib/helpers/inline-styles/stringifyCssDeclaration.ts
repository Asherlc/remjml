import type css from "css";

export function stringifyCssDeclaration(declaration: css.Declaration): string {
  return `${declaration.property}:${declaration.value};`;
}

export function stringifyCssDeclarations(
  declarations: css.Declaration[]
): string {
  return declarations
    .map((declaration) => stringifyCssDeclaration(declaration))
    .join("\n");
}
