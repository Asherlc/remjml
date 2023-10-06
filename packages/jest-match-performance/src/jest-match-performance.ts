import prettier from "prettier";
import { diff } from "jest-diff";

expect.extend({
  async toMatchHTMLPrettier(
    actualHtml: string,
    expectedHtml: string
  ): Promise<jest.CustomMatcherResult> {
    const actualPrettifiedHtml: string = await prettier.format(actualHtml, {
      parser: "html",
      htmlWhitespaceSensitivity: "ignore",
    });

    const expectedPrettifiedHtml: string = await prettier.format(expectedHtml, {
      parser: "html",
    });

    const pass = actualPrettifiedHtml === expectedPrettifiedHtml;

    return {
      pass,
      message: () => `
      Expected: ${expectedHtml}

      Received: ${actualHtml}

      ${diff(expectedPrettifiedHtml, actualPrettifiedHtml)}`,
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchPerformance(expectedFunction: () => unknown): Promise<R>;
    }
    interface ExpectExtendMap {
      toMatchPerformance?: CustomMatcher;
    }
  }
}
