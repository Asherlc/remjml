export type UniversalAttributes = Partial<{
  "css-class": string;
  "mj-class": string;
}>;

export interface Component {
  readonly tagName: string;
  readonly attributes: UniversalAttributes & Record<string, string>;
}
