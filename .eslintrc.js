module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
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
    chai: true,
  },
  plugins: [],
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    // Disable conflicting eslint rules ( https://github.com/prettier/eslint-config-prettier ):
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    'space-infix-ops': ['error'],
    // Flag bad 'requires', not just 'imports':
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
  },
};
