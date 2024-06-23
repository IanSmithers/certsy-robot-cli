/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './tests/coverage',
  rootDir: './src',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^helpers/(.*)$': '<rootDir>/helpers/$1',
  }
};
