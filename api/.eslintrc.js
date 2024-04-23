module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: 'love'
        }
    ],
    ignorePatterns: [
        'node_modules/',
        'tests/'
    ],
}