# Babel / React Boilerplate

Upstream: node/babel/master

Smoke test:

    npm run boilerplate # test webpack dev server
    npm run build:dist  # test prod webpack bundling to build/
    npm run build       # builds babel/ts output to lib/
    npm test
    npm run lint # eslint

Go to: <http://localhost:8080> . The port may increment.

Features:

- babel/ts (from node/babel/master)
  - babel uses @babel/preset-typescript
  - we use tsc for generating type declaration files
  - babel will output to `lib/`
    - we would use lib/ when publishing a component library to npm

- react
  - babel uses @babel/preset-react

- webpack
  - uses babel to bundle to `build/`
    - we would use webpack (bundling) when deploying
    - `babel-loader` is the loader
      - if we were not using babel, but just ts by itself, we might use `ts-loader`

  - `style-loader` and `css-loader`
    - <https://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader>
    - "The CSS loader takes a CSS file and returns the CSS with imports and url(...) resolved via webpack's require functionality..."
    - "The style loader takes CSS and actually inserts it into the page so that the styles are active on the page." ie "Adds CSS to the DOM by injecting a style tag"

  - css modules
    - Enabled by `css-loader`'s `modules: true` option
    - Only enabled for `*.module.css` files
      - other `*.css` files will be loaded without any transformation to the class names; you can test this with the `.some-global-class` class in the boilerplate; if it's transformed the boilerplate styling won't work.
    - See <https://webpack.js.org/loaders/css-loader/#modules>
    - The standard: <https://github.com/css-modules/css-modules>
    - :local vs :global
      - <https://github.com/webpack-contrib/css-loader#scope>
      - <https://github.com/css-modules/css-modules/issues/264>

  - importing "*.css" files in typescript files
    - typescript needs a declaration file to handle importing non .tsx? files
    - we add `declarations.d.ts` to the project root to make ts happy
    - eslint does not appear to handle `declare` in .d.ts files very well
      so we currently use `.eslintignore` to ignore them
      - <https://stackoverflow.com/questions/55989643/vscode-eslint-complaining-parsing-error-only-declares-and-type-imports-are-allo>
    - autocomplete class names on css modules
      - we can use <https://www.npmjs.com/package/typescript-plugin-css-modules>
        - we have to add it as a plugin to tsconfig.json
        - we need to use the "workspace typescript" to make it work in vscode
          - in `.vscode` we have `{ "typescript.tsdk": "node_modules/typescript/lib" }`
            - this can be done with: cmd+p `Typescript: Select Typescript Version...` and selecting the workspace version
        - TODO: is there a better way??

- postcss (style/css loaders)
  - import and url modules
    - <https://github.com/postcss/postcss-url> - inline, rebase, copy url() assets
    - <https://github.com/postcss/postcss-import> - inlines @imports
      - "This plugin works great with postcss-url plugin, which will allow
        you to adjust assets url() (or even inline them) after inlining
        imported files."
  - postcss-preset-env
    - <https://github.com/csstools/postcss-preset-env>
    - defaults to stage 2 - <http://preset-env.cssdb.org/features#stage-2>

## TODO

- get typings for css modules

## 2021-04-05

- Updated boilerplate using `node/babel/master`
  - now using jest, replaces mocha/chai/sinon
- css modules will fail out of the box with jest
  - use `identity-obj-proxy`
  - reference it in `moduleNameMapper` (jest.config.js)
  - also see <https://jestjs.io/docs/webpack#mocking-css-modules> recommends using
- Replaced enzyme with react-testing-library
  - <https://testing-library.com/docs/dom-testing-library/install>
    - this is generic (html)
  - we need the one for react
    - <https://testing-library.com/docs/react-testing-library/intro>
    - "NOTE: This library is built on top of DOM Testing Library which is where most of the logic behind the queries is."
  - Set `testEnvironment: 'jsdom',` in jest.config.js because react testing library needs `document`
    - <https://github.com/testing-library/react-testing-library/issues/422>
  - webpackge `merge` is not named import `{ merge }`

## 2020-06-07

- Updated boilerplate.
- `npm run build:dist` does webpack whereas `build` transpiles to lib/.
  If we are a lib, we'll want `build` rather than `dist`.

## 2020-05-12

- Re-worked webpack
  - `npm run build` runs webpack.prod.js and will generate output in `build/`:
    index.html
    index.html.gz
    runtime.619f64fbecaa5b8f4a72.js
    runtime.619f64fbecaa5b8f4a72.js.gz
    vendors.7b0159dbcb6ee875989a.js
    vendors.7b0159dbcb6ee875989a.js.gz
    dist.e1ef672561874520f922.js.gz
    dist.e1ef672561874520f922.js
  - `webpack.common.js` has all our common settings; `webpack-merge`
    does merging; note the use of `merge.strategy({ entry: 'replace' })(...)`
    in webpack.boilerplate.js to completely override inherited webpack settings.
  - `webpack.prod.js` will build the `build/` directory; `webpack.dev.js`
    is mostly webpack-dev-server.
  - `optimization.runtimeChunk` creates runtime bundle
  - `optimization.splitChunks` creates vendors bundle
  - `html-webpack-plugin` will insert runtime, vendors and dist bundles
    in to `templates/index.html`; they're inserted in that order into
    the bottom of the body tag. If you want css extracted (if using css
    modules) the current best practice looks to use MiniCssExtractPlugin
    and will work with html-webpack-plugin to put things in the head and specify
    output path (instead of `output.path`)
  - `html-webpack-harddisk-plugin` makes html-webpack-plugin work with
    webpack-dev-server. But don't use `lazy` option. It appears to stop
    html-webpack-harddisk-plugin from working as intended;
    this plugin makes `alwaysWriteToDisk` setting work even though this
    is in webpack.common.js and the harddisk plugin is in the descendent
    webpack.dev.js file.
  - `lazy` is gone; I think we get live reloads by default but `hot`
    is enabled by default
  - minification is done if `mode` is `production` - in `webpack.prod.js`
  - clean-webpack-plugin clears out `build/`
  - gzip is done in webpack.prod.js
  - `webpack.boilerplate.js` inherits from `webpack.dev.js`
    Use `npm run boilerplate`. There is some "replace me" code in src/index.js

## 2020-05-09

- Removed most postcss modules with exception of import, url, preset-env and report.
  Noticed there were big problems with nested and calc values and that the boilerplate was completely broken.
  Was seeing `calc(...)` in the class attribute, and css modules values also being inserted as class names.
  It seems like there were issues with nesting, calc and css modules values. Nesting and calc weren't even
  present although maybe they had been in the old postcss-cssnext?

  Things that might be useful in the future:

  - `postcss-modules-values` still seems popular. We can bring it back if we work around postcss in future.
  - `postcss-nesting` which follows a draft for nesting css eg `& .foo { ... }`.
    - because it's stage 1 <http://preset-env.cssdb.org/features#stage-1> I'm leaving this out as well
    - `postcss-nested` is older and less standard and what we were using before
  - `postcss-calc` also seems very popular - recommended with custom properties

- Installed `postcss-preset-env` and removed `postcss-next`
  - `postcss-cssnext` is archived, see <https://moox.io/blog/deprecating-cssnext/>
  - `postcss-preset-env`uses `stages` from <https://cssdb.org/>
  - by default will select stage 2
    - eg atm nested rules <https://drafts.csswg.org/css-nesting-1/> ( <https://github.com/postcss/postcss-nesting> )
      is stage 1
    - NOTE: we are currently using `postcss-nested` which is older, will need to change this as well

## 2020-04-17

- Merge latest github/babel-master - brings in typescript, removes flow.
- Major upgrade of all deps.
- src/boilerplate/boilerplate.tsx is a ts react component
- `test/register` let's us set `--extensions` for @babel/register when running tests
  so that we load/resolve in .ts and .tsx files correctly. Without setting `extensions`
  to include .ts and .tsx, the node cjs loader will get invoked and will throw when
  it sees `import`/`export` statements.
  Note that babel-master boilerplate already does `babel --extensions ...` in the cli build step.
- Also note: we need `babel-plugin-istanbul` and to set `env.test.plugins` to `istanbul`
  for `nyc` to count. Without it, it will just say `0` and not count any files.

## 2018-04-26

- Merge latest github/babel-master - brings in chai-as-promised.

## 2018-03-19

- Add `rm -rf lib/` to `build` run-script.
  Can get weird behaviour if we don't clear out the old especially
  if a function has been moved.
- Added step to copy styles from `src/styles` to `lib/styles`.
  I think we need this if we are a lib and are not building with babel
  and not bundling with webpack. Taken from 2br-spaces project which
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
  - <http://randycoulman.com/blog/2016/03/22/testing-with-mocha-and-webpack/>
    Explains rationale for mocha-webpack.
  - <https://github.com/andris9/encoding/issues/16> mentions a case where we have a dynamic
    require in the encoding module which causes webpack users issues.
    <https://github.com/andris9/encoding/issues/16#issuecomment-227007589> sums up the
    issue.
- THEN switched (back) to `ignore-styles` + babel-register - <https://www.npmjs.com/package/ignore-styles> .
  `mocha-webpack` is slow, and needs to `target` 'node' which causes issues when using
  `isomorphic-fetch` which uses `node-fetch` which uses `encoding` which gets a warning because of
  dynamic require. (You can configure webpack to ignore or handle these situations but it is ugly).
  eg <https://github.com/andris9/encoding/issues/16> .
- eslint is `~4.1.0` because we get warnings that break flycheck for `4.{2,3}.x`.

## 2017-08-05

- Using --lazy to load for webpack-dev-server because
  `webpack-dev-server --inline --hot ...` is not working.
- NOTE: don't confuse react-hot-loader with webpack-dev-server.
  We should be getting hot reloading for free with no extra
  messing about.
- TODO: we might want to consider using <https://www.browsersync.io/>
  and the webpack (or webpack-dev-server) plugin, but
  I don't think it will give us HMT.
- Use `postcss-scss` parser to benefit from inline comments.
  `postcss-discard-comments` looks mature see this issue:
  <https://github.com/postcss/postcss/issues/362>
- <https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9>
  Good overview.
- <https://webpack.js.org/configuration/>
  Good configuration reference.
