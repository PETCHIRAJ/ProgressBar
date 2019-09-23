module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: ['jest', 'react-hooks'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'react-hooks/rules-of-hooks': 'error',
  },
};
