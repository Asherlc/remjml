import prettier from "prettier";
import { diff } from "jest-diff";

export interface Options {
  prettier?: boolean | prettier.Options;
}

const DEFAULT_PRETTIER_OPTIONS: prettier.Options = {
  parser: "html",
  htmlWhitespaceSensitivity: "ignore",
};

expect.extend({
  async toMatchHTML(
    actualHtml: string,
    [expectedHtml, options]: [expectedHtml: string, options?: Options]
  ): Promise<jest.CustomMatcherResult> {
    let prettierOptions: prettier.Options | undefined;

    if (typeof options?.prettier === "boolean") {
      prettierOptions = DEFAULT_PRETTIER_OPTIONS;
    } else if (typeof options?.prettier === "object") {
      prettierOptions = {
        ...DEFAULT_PRETTIER_OPTIONS,
        ...options.prettier,
      };
    }

    let formattedActualHtml: string = actualHtml;
    let formattedExpectedHtml: string = expectedHtml;

    if (prettierOptions) {
      formattedActualHtml = await prettier.format(actualHtml, prettierOptions);
      formattedExpectedHtml = await prettier.format(
        expectedHtml,
        prettierOptions
      );
    }

    const pass = formattedActualHtml === formattedExpectedHtml;

    return {
      pass,
      message: () => `
      Expected: ${expectedHtml}

      Received: ${actualHtml}

      ${diff(formattedExpectedHtml, formattedActualHtml)}`,
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchHTML(expectedHtml: string, options?: Options): Promise<R>;
    }
    interface ExpectExtendMap {
      toMatchHTML?: CustomMatcher;
    }
  }
}
