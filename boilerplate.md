# Babel / React Boilerplate

This is actually: react + webpack + postcss (style/css loaders) + cssnext.
Flow is included because we extend babel.

## 2017-08-05
- Using --lazy to load for webpack-dev-server because
  `webpack-dev-server --inline --hot ...` is not working.
- NOTE: don't confuse react-hot-loader with webpack-dev-server.
  We should be getting hot reloading for free with no extra
  messing about.
- TODO: we might want to consider using https://www.browsersync.io/
  and the webpack (or webpack-dev-server) plugin, but
  I don't think it will give us HMT.
- Use `postcss-scss` parser to benefit from inline comments.
  `postcss-discard-comments` looks mature see this issue:
  https://github.com/postcss/postcss/issues/362
