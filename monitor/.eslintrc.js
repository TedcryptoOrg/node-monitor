module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: 'love',
            rules: {
                '@typescript-eslint/no-empty-interface': 'off',
            }
        }
    ],
    ignorePatterns: [
        'jest.config.ts',
        '.eslintrc.js',
        'babel.config.js',
        'node_modules/',
        'tests/',
    ],
}