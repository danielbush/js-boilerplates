module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    // Setting this and using '2020' seems to allow us to resolve .ts/.tsx files.
    ecmaVersion: 2020,
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  globals: {
    module: true,
    fetch: true,
    sandbox: true,
    expect: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [],
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:@typescript-eslint/recommended',
    // Disable conflicting eslint rules ( https://github.com/prettier/eslint-config-prettier ):
    'prettier',
    'plugin:prettier/recommended',
    // https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'space-infix-ops': ['error'],
    // Flag bad 'requires', not just 'imports':
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    // Allow req, res, next, err for express routes.
    // See https://eslint.org/docs/rules/no-unused-vars#argsignorepattern
    '@typescript-eslint/no-unused-vars': [
      2,
      { argsIgnorePattern: 'req|res|next|err' },
    ],
  },
};
