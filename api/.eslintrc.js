module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: 'love'
        }
    ],
    ignorePatterns: [
        'jest.config.ts',
        'node_modules/',
        'tests/',
        '**/Prometheus/prometheusUtils.ts',
        '**/Prometheus/parseLine.ts',
    ],
}