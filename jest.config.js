// jest.config.js
export default {
  moduleNameMapper: {
    '\\.html$': '<rootDir>/tests/__mocks__/htmlMock.js'
  },
  preset: 'jest-puppeteer',
  globalSetup: '<rootDir>/jest/globalSetup.js',
  globalTeardown: '<rootDir>/jest/globalTeardown.js',
  setupFiles: ['<rootDir>/jest/globals.js'],
  testEnvironment: 'jest-environment-puppeteer',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'},
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/junit',
      outputName: 'results.xml',
      addFileAttribute: 'true',
      ancestorSeparator: ' › ',
      uniqueOutputName: 'false'
    }]
  ],
  coverageReporters: ['json', 'lcov', 'cobertura']
};