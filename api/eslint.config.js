module.exports = {
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: [
        'jest.config.ts',
        'eslint.config.js',
        'babel.config.js',
        'tests/**/*.ts',
        '**/Prometheus/prometheusUtils.ts',
        '**/Prometheus/parseLine.ts',
    ],
}