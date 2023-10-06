import { performance, PerformanceObserver } from "node:perf_hooks";
import { mean } from "lodash-es";

export interface Options {
  cycles: number;
}

interface Speeds {
  actual: number[];
  expected: number[];
}

const DEFAULT_OPTIONS: Options = { cycles: 1 };

expect.extend({
  async toBeFasterThan(
    actualFunction: () => unknown | Promise<unknown>,
    [expectedFunction, options]: [
      expectedFunction: () => unknown | Promise<unknown>,
      options?: Options,
    ]
  ): Promise<jest.CustomMatcherResult> {
    const optionsWithDefaults: Options = { ...DEFAULT_OPTIONS, ...options };

    const speeds: Speeds = {
      actual: [],
      expected: [],
    };

    const perfObserver = new PerformanceObserver((items) => {
      items.getEntries().forEach((entry) => {
        console.log(entry);
      });
    });

    perfObserver.observe({ entryTypes: ["measure"], buffered: true });

    for (let i = 0; i <= optionsWithDefaults.cycles; i++) {
      performance.mark("actual-start");
      await actualFunction();
      performance.mark("actual-end");
    }

    performance.measure("actual");

    for (let i = 0; i <= optionsWithDefaults.cycles; i++) {
      performance.mark("expected-started");
      await expectedFunction();
      performance.mark("expected-end");
    }

    performance.measure("expected");

    const pass = mean(speeds.actual) < mean(speeds.expected);

    return {
      pass,
      message: () => `
        Expected ${actualFunction} (${mean(
          speeds.actual
        )}ms) to be faster than ${expectedFunction} (${mean(
          speeds.expected
        )}ms`,
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchPerformance(
        expectedFunction: () => unknown,
        options?: Options
      ): Promise<R>;
    }
    interface ExpectExtendMap {
      toMatchPerformance?: CustomMatcher;
    }
  }
}
