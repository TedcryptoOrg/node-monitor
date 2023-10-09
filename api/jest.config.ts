/*
 * For a detailed explanation regarding each configuration.ts property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testRunner: 'jest-circus/runner',
  clearMocks: true,
  setupFiles: ["<rootDir>/tests/bootstrap.ts"],
};
