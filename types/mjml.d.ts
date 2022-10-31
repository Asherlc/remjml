declare module "mjml" {
  export type MJMLValidationLevel = "strict" | "soft" | "skip";
  export interface MJMLParsingOpts {
    readonly fonts?: { readonly [key: string]: string };
    readonly keepComments?: boolean;
    readonly beautify?: boolean;
    readonly minify?: boolean;
    readonly validationLevel?: MJMLValidationLevel;
    readonly filePath?: string;
    readonly minifyOptions?: MJMLMinifyOptions;
    readonly skeleton?: (data: any) => string;
  }

  export interface MJMLParseError {
    readonly line: number;
    readonly message: string;
    readonly tagName: string;
    readonly formattedMessage: string;
  }

  export interface MJMLParseResults {
    readonly html: string;
    readonly errors: MJMLParseError[];
  }

  export interface MJMLJsonObject<
    A extends object = {},
    Children extends MJMLJsonObject[] = []
  > {
    readonly tagName: string;
    readonly attributes: A;
    readonly children?: Children;
    readonly content?: string;
  }

  export interface MJMLMinifyOptions {
    readonly collapseWhitespace?: boolean;
    readonly minifyCSS?: boolean;
    readonly removeEmptyAttributes?: boolean;
  }

  type AttributeKey = string;
  type AttributeValue = string | number | undefined;
  type ParsedAttributeValue = AttributeValue | boolean;
  type Direction = "top" | "bottom" | "left" | "right";

  type Attributes = { readonly [key: string]: AttributeValue };
  type ParsedAttributes = { readonly [key: string]: ParsedAttributeValue };

  export default function mjml2html(
    inp: string | MJMLJsonObject,
    opts?: MJMLParsingOpts
  ): MJMLParseResults;
}
