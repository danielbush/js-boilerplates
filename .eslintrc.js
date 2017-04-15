module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  globals: {
    module: true,
    fetch: true
  },
  rules: {
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
    'no-undef': [ 2, { typeof: true } ]
  }
};