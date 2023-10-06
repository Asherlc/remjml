export default {
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
      // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
      // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
      "^.+\\.tsx?$": [
          "ts-jest",
          {
              useESM: true,
              isolatedModules: true,
          },
      ],
  },
  preset: "jest-puppeteer",
  snapshotSerializers: ["jest-serializer-html"],
  projects: ["<rootDir>"],
  roots: ["<rootDir>/packages/remjml/tests/integration"]
};
