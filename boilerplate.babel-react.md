# Babel / React Boilerplate

This is actually: react + webpack + postcss (style/css loaders) + cssnext.
Flow is included because we extend babel.

## 2018-03-19
- Add `rm -rf lib/` to `build` run-script.
  Can get weird behaviour if we don't clear out the old especially
  if a function has been moved.
- Added step to copy styles from `src/styles` to `lib/styles`.
  I think we need this if we are a lib and are not building with babel
  and not bundling with webpack.  Taken from 2br-spaces project which
  is build as package and used by 2br-frontend.

## 2018-03-11
- Added `postcss-modules-values-replace` - this lets us use dimensionless `@value`'s inside
  `calc` and is a replacement for `postcss-modules-values`.
  It handles edge cases like:
  `@value foo: 1;`
  `@value bar: calc(foo + foo)px;`
  If we use `bar` in a class, we'll see `2px`.
  NOTE: `@value foo: 1px;` will work WITHOUT `postcss-modules-values-replace`;
  we'll see `calc(1px +1px)` in the css when used in a rule.
  The case we are handling is when there is NO `px` or other unit on the value.
  - Dimensionless units may be useful when doing svg - an example is a circle
    radius value which is implicitly 'px' but which we may want to use to specify
    things like height or line-height.
- We may want to consider `postcss-calc` as well - it is mentioned in the docs.

## 2017-11-19
- Upgraded the boilerplate.
- I've enabled babel-polyfill import in src/index.js
- I'm not sure we really need the docker files - we could just delete them?

## 2017-08-06
- Using style / css load won't work with babel tests, so switched to `mocha-webpack`.
  - NOTE: `mocha-webpack-watch` will print multiple results to the screen usually at start up.
  - http://randycoulman.com/blog/2016/03/22/testing-with-mocha-and-webpack/
    Explains rationale for mocha-webpack.
  - https://github.com/andris9/encoding/issues/16 mentions a case where we have a dynamic
    require in the encoding module which causes webpack users issues.
    https://github.com/andris9/encoding/issues/16#issuecomment-227007589 sums up the
    issue.
- THEN switched (back) to `ignore-styles` + babel-register - https://www.npmjs.com/package/ignore-styles .
  `mocha-webpack` is slow, and needs to `target` 'node' which causes issues when using
  `isomorphic-fetch` which uses `node-fetch` which uses `encoding` which gets a warning because of
  dynamic require.  (You can configure webpack to ignore or handle these situations but it is ugly).
  eg https://github.com/andris9/encoding/issues/16 .
- eslint is `~4.1.0` because we get warnings that break flycheck for `4.{2,3}.x`.


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
- https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9
  Good overview.
- https://webpack.js.org/configuration/
  Good configuration reference.
