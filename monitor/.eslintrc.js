module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: 'love',
            rules: {
                //'@typescript-eslint/no-extraneous-class': 'off',
                //'@typescript-eslint/no-empty-interface': 'off',
                //'@typescript-eslint/naming-convention': 'off',
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