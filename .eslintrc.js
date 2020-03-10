module.exports = {
    env: {
        browser: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    rules: {
        // react plugin - options
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/prop-types': 'error'
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8
    }
}
