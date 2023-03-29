import baseConfig from "./jest.config.base.js";
export default {
    ...baseConfig,
    projects: ["<rootDir>", "<rootDir>/packages/*"],
    testPathIgnorePatterns: ["<rootDir>/tests/integration", "<rootDir>/dist", "<rootDir>/packages/.+/dist"]
};
