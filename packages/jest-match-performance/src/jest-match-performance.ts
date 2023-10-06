import { performance, PerformanceObserver } from "node:perf_hooks";
import { mean, times } from "lodash-es";

export interface Options {
  cycles: number;
}

interface Speeds {
  actual: number[];
  expected: number[];
}

const DEFAULT_OPTIONS: Options = { cycles: 1 };

type ProfilableFunction = () => unknown | Promise<unknown>;

expect.extend({
  async toBeFasterThan(
    actualFunction: ProfilableFunction,
    expectedFunction: ProfilableFunction,
    options?: Options
  ): Promise<jest.CustomMatcherResult> {
    const optionsWithDefaults: Options = { ...DEFAULT_OPTIONS, ...options };

    const speeds: Speeds = {
      actual: [],
      expected: [],
    };

    const perfObserver = new PerformanceObserver((items) => {
      items.getEntries().forEach((entry: PerformanceEntry) => {
        console.log(entry);
        speeds[entry.name as keyof Speeds].push(entry.duration);
        console.log(speeds);
      });
      perfObserver.disconnect();
    });

    perfObserver.observe({ entryTypes: ["measure"], buffered: true });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _i of times(optionsWithDefaults.cycles)) {
      performance.mark("actual-start");
      await actualFunction();
      performance.mark("actual-end");
    }

    performance.measure("actual");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _i of times(optionsWithDefaults.cycles)) {
      performance.mark("expected-started");
      await expectedFunction();
      performance.mark("expected-end");
    }

    performance.measure("expected");

    const meanActualSpeedMs = mean(speeds.actual);
    const meanExpectedSpeedMs = mean(speeds.expected);
    console.log({ speeds, meanActualSpeedMs, meanExpectedSpeedMs });

    const pass = meanActualSpeedMs < meanExpectedSpeedMs;

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
      toBeFasterThan(
        expectedFunction: () => unknown,
        options?: Options
      ): Promise<R>;
    }
    interface ExpectExtendMap {
      toBeFasterThan?: CustomMatcher;
    }
  }
}
