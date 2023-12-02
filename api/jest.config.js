module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/api/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
  