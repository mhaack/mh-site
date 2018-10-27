module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true
    },
    plugins: ['react', 'prettier'],
    globals: {
        global: true,
        graphql: false
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    extends: [
        'prettier',
        'prettier/react',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],
    settings: {
        react: {
            pragma: 'React',
            version: '16.5.1'
        }
    }
}
