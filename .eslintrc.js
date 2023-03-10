/* eslint-disable no-undef */
module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/jsx-runtime', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'no-extra-semi': 0,
  },
}
