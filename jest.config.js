export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    collectCoverage: true,
    moduleFileExtensions: ["js", "jsx"],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/App.js$",
        "<rootDir>/src/index.js$",
        "<rootDir>/src/app/store.js$"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/__tests__/",
        "\\.test\\.js$",
        "\\.spec\\.js$",
        "<rootDir>/src/App.js$",
        "<rootDir>/src/index.js$",
        "<rootDir>/src/app/store.js$"
    ],
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",   // include only your source files
        "!src/**/*.test.{js,jsx,ts,tsx}",  // exclude test files
        "!src/**/*.spec.{js,jsx,ts,tsx}"   // exclude spec files
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    preset: undefined,
};