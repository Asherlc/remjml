import { performance } from "node:perf_hooks";
import { mean } from "lodash-es";

export interface Options {
  cycles?: number;
  precision?: number;
}

interface Speeds {
  actual: number[];
  expected: number[];
}

const DEFAULT_OPTIONS = { cycles: 1 } as const;

type ProfilableFunction = () => unknown | Promise<unknown>;

expect.extend({
  async toBeFasterThan(
    actualFunction: ProfilableFunction,
    expectedFunction: ProfilableFunction,
    options?: Options
  ): Promise<jest.CustomMatcherResult> {
    const speeds: Speeds = {
      actual: [],
      expected: [],
    };

    const cycles = options?.cycles || DEFAULT_OPTIONS.cycles;

    for (let i: number = 0; i <= cycles; i++) {
      const actualFunctionStart: number = performance.now();
      await actualFunction();
      const actualFunctionEnd: number = performance.now();

      speeds.actual.push(actualFunctionEnd - actualFunctionStart);

      const expectedFunctionStart: number = performance.now();
      await expectedFunction();
      const expectedFunctionEnd: number = performance.now();

      speeds.expected.push(expectedFunctionEnd - expectedFunctionStart);
    }

    // const measure = performance.measure("actual");
    // console.log(measure);

    performance.measure("expected");

    const meanActualSpeedMs = mean(speeds.actual);
    const meanExpectedSpeedMs = mean(speeds.expected);

    const pass = meanActualSpeedMs < meanExpectedSpeedMs;

    return {
      pass,
      message: () => `
        Expected ${actualFunction} (${meanActualSpeedMs.toPrecision(
          options?.precision
        )}ms) to be faster than ${expectedFunction} (${meanExpectedSpeedMs.toPrecision(
          options?.precision
        )}ms)`,
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
