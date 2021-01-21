module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
  preset: 'jest-preset-angular',
  collectCoverage: true,
  coverageDirectory: 'dist/test-coverage',
  collectCoverageFrom: ['src/app/**/*.ts'],
  coveragePathIgnorePatterns: [
    'src/libs/elements/',
    'main.ts',
    'polyfills.ts',
    'public_api.ts',
    '.module.ts',
    '.interface.ts',
    '.utils.ts',
    '.story.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/libs/elements',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/libs/schematics',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
