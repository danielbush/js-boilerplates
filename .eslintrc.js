module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  globals: {
    module: true,
    fetch: true,
    sandbox: true,
    expect: true,
    chai: true,
    enzyme: true,
  },
  plugins: [
    'react',
    'flowtype',
    'import'
  ],
  extends: [
    // https://www.npmjs.com/package/eslint-plugin-react#recommended
    'plugin:react/all',
    // https://www.npmjs.com/package/eslint-plugin-flowtype#eslint-plugin-flowtype-configuration
    'plugin:flowtype/recommended'
  ],
  rules: {
    'import/no-unresolved': [ 2, { commonjs: true, amd: true } ],
    'space-infix-ops': [ 'error' ],
    quotes: [ 2, 'single', 'avoid-escape' ],
    'keyword-spacing': 2,
    'linebreak-style': [ 2, 'unix' ],
    indent: [ 2, 2, { SwitchCase: 1, VariableDeclarator: { var: 2, let: 2, const: 3 } } ],
    'no-trailing-spaces': 2,
    'object-curly-spacing': [ 2, 'always' ],
    'comma-spacing': [ 2, { before: false, after: true } ],
    'space-before-blocks': [ 2, { functions: 'always', keywords: 'always', classes: 'always' } ],
    'space-before-function-paren': 2,
    'no-spaced-func': 2,
    'no-mixed-spaces-and-tabs': 2,
    semi: [ 2, 'always' ],
    strict: [ 2, 'safe' ],
    'no-undef': [ 2, { typeof: true } ],

    // Modification to plugin:react/all
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-no-literals': 0,
    'react/sort-comp': 0,
    'react/jsx-filename-extension': 0
  }
};
