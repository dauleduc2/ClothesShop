/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
};

module.exports = config;

module.exports = {
    clearMocks: true,
    maxWorkers: 1,
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "**/tests/**/*.[jt]s?(x)",
        "!**/tests/coverage/**",
        "!**/tests/utils/**",
        "!**/tests/images/**",
    ],
};
