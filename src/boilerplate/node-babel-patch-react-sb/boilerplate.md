# Babel / React + Storybook Boilerplate

Upstream: node/babel/patch/react-sb

Storybook can be tricky to get right because of webpack version issues.
For the moment, I'm treating it as a patch on react.
We can look at this patch to easily see what we did to make storybook work.

Smoke test:

Same as node-babel-patch-react.
Plus:

    npm run storybook

Synopsis

Same as react but with storybook added.

Storybook includes:

- use `npm run storybook` to start it up
- npm run build-storybook
- stories are in `src/stories`
  - they contain initial boilerplate provided by storybook
- configuration is in `.storybook/`

## TODO

- "implicit PostCSS loader" warning
  - example
    (node:56489) DeprecationWarning: Relying on the implicit PostCSS loader is deprecated and will be removed in Storybook 7.0.
    If you need PostCSS, include '@storybook/addon-postcss' in your '.storybook/main.js' file.
  - <https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader>
    - but if I add `"@storybook/addon-postcss"` to .storybook/main.js storybook gives a "cannot GET /" error

## 2021-05-03

- Added storybook using: `npx sb init`
  - This added @storybook/* packages, `storybook` and `build-storybook` run-scripts
  - We get 2 errors when running `npm run storybook` using latest postcss / webpack:
  - First error:
    - fix: npm i -D dotenv-webpack@6.0.4
    - example
      ERR!     at exports.provide (/Users/daniel.bush/Documents/work/js-boilerplates/node-babel-patch-react/node_modules/webpack/lib/util/MapHelpers.js:17:20)
      ERR!     at /Users/daniel.bush/Documents/work/js-boilerplates/node-babel-patch-react/node_modules/webpack/lib/DefinePlugin.js:289:51
    - DefinePlugin "cannot call get of undefined" issue - this happened when I updated to latest
      - <https://github.com/storybookjs/storybook/issues/14403#issuecomment-813520708>
      - <https://github.com/storybookjs/storybook/issues/14497> - describes my issue
  - Second error:
    - fix: npm i -D postcss-import@12 postcss-reporter@6 postcss-url@9
    - example
      ERROR in ./src/stories/button.css (./node_modules/@storybook/builder-webpack4/node_modules/css-loader/dist/cjs.js??ref--11-1!./node_modules/@storybook/builder-webpack4/node_modules/postcss-loader/dist/cjs.js??ref--11-2!./src/stories/button.css)
      Module build failed (from ./node_modules/@storybook/builder-webpack4/node_modules/postcss-loader/dist/cjs.js):
      Error: PostCSS plugin postcss-import requires PostCSS 8.
    - See <https://github.com/postcss/postcss-import/issues/435#issuecomment-735443369>
    - Had to wind back some postcss libraries because storybook's version of postcss-importer doesn't handle postcss 8.
      - "postcss-import": "^14.0.1",  ->    "postcss-import": "^12.0.0",
      - "postcss-reporter": "^7.0.2", ->    "postcss-reporter": "^6.0.0",
      - "postcss-url": "^10.1.3",     ->    "postcss-url": "^9.0.0",
