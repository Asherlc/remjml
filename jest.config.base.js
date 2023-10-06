import { fileURLToPath } from 'node:url'

const prettier2Url = await import.meta.resolve('prettier-2')
const prettier2Path = fileURLToPath(prettier2Url)


/** @type {import('jest').Config} */
export default {
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
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
    testEnvironment: "node",
    snapshotSerializers: ["jest-serializer-html"],
    // https://jestjs.io/docs/configuration/#prettierpath-string
    prettierPath: prettier2Path
};
