# React Router Boilerplate

This is node_babel_react + react router.
Specifically we use `react-router-dom` which uses `react-router`.

TODO: explore bundle splitting using routes.

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
- Installed react router.
- https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
  Looks like a really good intro to react-router.
- https://reacttraining.com/react-router/web/guides/quick-start
- https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
  because I was interested in if we could change route when scrolling or using waypoints.
- https://github.com/ReactTraining/history
  Understand `browser`, `hash` and `memory` instances of `history`.
