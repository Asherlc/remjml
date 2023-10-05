import type css from "css";

export function applyDeclaration(
  declarations: css.Declaration[],
  declaration: css.Declaration
): css.Declaration[] {
  const hasExistingStyle: boolean = declarations.some(
    (inlineDeclaration: css.Declaration): boolean => {
      return inlineDeclaration.property === declaration.property;
    }
  );

  if (hasExistingStyle) {
    return declarations;
  }

  return [...declarations, declaration];
}
