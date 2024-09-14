module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    setupFiles: ['<rootDir>/src/jest.setup.ts'],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Code discount Test Report',
                outputPath: './reports/test-report.html',
                includeFailureMsg: true,
                includeConsoleLog: true,
            },
        ],
    ],
};
