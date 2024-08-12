module.exports = [{
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        ...require('eslint-config-love').rules,
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/class-methods-use-this": "off",
        "@typescript-eslint/max-params": "off",
    },
    ignores: [
        'jest.config.ts',
        'eslint.config.js',
        'babel.config.js',
        'node_modules/',
        'tests/**/*.ts',
    ],
}]