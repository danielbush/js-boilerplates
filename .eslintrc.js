module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
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
    jest: true,
  },
  settings: { react: { version: 'detect' } },
  plugins: ['@babel', 'react', 'react-hooks', 'import'],
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    // Disable conflicting eslint rules ( https://github.com/prettier/eslint-config-prettier ):
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // https://www.npmjs.com/package/eslint-plugin-react#recommended
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'space-infix-ops': ['error'],
    // Flag bad 'requires', not just 'imports':
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    // Modification to plugin:react/all
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-no-literals': 0,
    'react/sort-comp': 0,
    'react/jsx-filename-extension': 0,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, node: true, es6: true, jest: true },
      extends: [
        // Replicating the above, do we need to?
        'eslint:recommended',
        'prettier',
        'plugin:prettier/recommended',
        // These are specific to ts:
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true, modules: true },
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
