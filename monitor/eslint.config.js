module.exports = [{
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        ...require('eslint-config-love').rules,
        "@typescript-eslint/no-empty-interface": "off",
    },
    ignores: [
        'jest.config.ts',
        'eslint.config.js',
        'babel.config.js',
        'node_modules/',
        'tests/**/*.ts',
    ],
}]