module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    setupFiles: ['<rootDir>/src/jest.setup.ts'],
};
