module.exports = {
    env: {
        node: true,
        es2022: true,
    },
    extends: ['eslint:recommended'],
    ignorePatterns: ['template.js'],
    parserOptions: {
        sourceType: 'module',
    },
}
