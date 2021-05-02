# Babel Boilerplate

Upstream: node-master

Babel boilerplate takes the node boilerplate and adds babel.

This setup buys us the following things in an es6+ environment:

- linting (prettier + eslint),
- tests (jest) - coverage,
- cli execution (`npm run dev`)
- babel compiles to `lib/*` and main entry point is lib/index.js
  You can test a build in node: `node lib/index.js` which can be useful sometimes.
- babel does several things: syntax (future js) and polyfills (future libs);
  some syntax such as async/await or generators have both syntax and libraries
  (eg regenerator-runtime); in order to transform new syntax into older syntax,
  babel "helpers" may be used.
  - SYNTAX: handled by `@babel/preset-env` "targets"; note: we use
    this regardless of whether we are a library or an app; the issue is
    whether and how to use preset-env's useBuiltIns option.
  - POLYFILLS: library vs app
    - `useBuiltIns`: 'entry'/'usage' (@babel/preset-env) is meant more for apps
      and pollutes global scope; 'usage' may be a compromise for libs but needs
      investigation; watch the `useBuiltIns` space for new options in the future.
    - `@babel/plugin-transform-runtime` is meant more for libs and doesn't
      pollute global scope but also can't target environments like preset-env
      `@babel/plugin-transform-runtime` is a devdep for builds;
      `@babel/runtime` is needed as a dep.
      It does 3 things: regenerator-runtime, core-js and "normalizes" babel helpers.
    - A 3rd way: "I don't think there's any "right answer" here; I lean on the
      side of having final users provide all polyfills, and libraries should
      document which ones they need."
      - Just a note on this: if we use any syntax that is not covered by preset-env
        ie something in `plugins` section of `.babelrc`, then we should probably include
        this when building and publishing to npm.
    - see <https://github.com/babel/babel/issues/7267>
- optional typescript if we write `.ts` files
  - this is different to a project that just uses straight typescript
  - by going through babel we can support projects that already use babel
    but which may want to start converting to typescript; this approach
    is based on <https://github.com/microsoft/TypeScript-Babel-Starter>
  - we use eslint's `overrides` to use `@typescript-eslint/parser` instead of
    `@babel/eslint-parser` for ts files to take advantage of the ts eslint rule
    eco-system
- there is no bundler (eg webpack, rollup etc).
- @babel/node (babel-node)
  - @babel/register (node -r @babel/register)
  - @babel/preset-typescript - gives us (optional) typescript via babel

## Smoke test

```sh
npm run boilerplate
npm run boilerplate:dev
npm run lint
npm run test
```

To test eslint for typescript, try creating an explicity any: `const foo: any = 123;`.  You should see something like: `Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any`

## 2021-05-02

- Updated to `@babel/eslint-parser`.  We were using outdated `babel-eslint`
  package; does not handle `as` type assertion.
  - See <https://babel.dev/blog/2020/07/13/the-state-of-babel-eslint#the-future>
    from <https://github.com/babel/babel-eslint/issues/813>
- Added `@babel/eslint-plugin` - see <https://www.npmjs.com/package/@babel/eslint-plugin>
  - Requires: `"plugins": ["@babel"]` in `.eslintrc.js`
- Use `@typescript-eslint` for eslint and ts as an override because `@babel/eslint-parser` does not handling linting for ts-specific things (it can parse ts however).
  - <https://github.com/typescript-eslint/typescript-eslint#what-about-babel-and-babeleslint-parser>
    "The key trade-off can be summarized as @babel/eslint-parser supports
    additional syntax which TypeScript itself does not, but typescript-eslint
    supports creating rules based on type information, which is not available to
    babel because there is no type-checker."
  - "Because they are separate projects powered by different underlying tooling,
    they are currently not intended to be used together."
    - ths solution? - `overrides` in eslint
      - <https://stackoverflow.com/questions/62953124/configure-eslint-to-parse-ts-and-tsx-as-typescript-and-js-and-jsx-as-ecmascr>
      - and <https://stackoverflow.com/questions/57597142/how-to-run-typescript-eslint-on-ts-files-and-eslint-on-js-files-in-the-same-pr>
    - <https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work>

## 2021-04-07

- Consolidated boilerplate files into `src/boilerplate/node-babel-master/`.

## 2021-04-05

- Updated all deps except mocha et al
- Merged `node/master`
  - now using jest

## 2020-06-07

- We need to install `@typescript-eslint/parser` so that
  `eslint-plugin-import` can handle ts files. We don't need to use it in
  eslintrc.js.
- We're also using `babel-eslint` for the parser. Might have been doing this before
  but our parent (node/master) doesn't because it doesn't use babel.
- `npm run check` runs linting and type checking; `npm run check:types` runs ts type checks.

## 2020-04-18

- Added `test/register.js`. Backported this from babel-react which is a descendent
  of this template.
- Fixed double nyc call. Ensure we see nyc stats by importing the boilerplate.js file
  into the boilerplate.spec.js file so that we can verify it works.
- `--extensions` for babel/babel-node includes `.tsx` and `.jsx` for completeness.
  Whilst we're unlikely to use the `x` versions for this template, it flows through
  to react-babel. Also `test/register.js` is already doing this.
- Added boilerplate.spec.ts so we can write tests in typescript.
  Had to add `mocha` to `types` in `tsconfig.json`.
  We have to `import` `expect` in every file though.
  Maybe <https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b1cfdc9ab7257e7cab9238a4ae61758df96ee7ff/types/mocha/index.d.ts#L2856>
  is why we don't have to do this for mocha's `describe` and `it`?
- `npm run dev` runs dev environment; `npm run start` now run the build in `lib/`.

## 2020-04-16

- Changes
  - removed @babel/polyfill
  - added core-js and regenerator-runtime as deps
  - src/index.js imports core-js and regenerator-runtime
  - @babel/preset-env useBuiltIns set to "entry" now, this will break up
    core-js import in src/index.js based on preset-env's "targets" setting.
  - added "browsers": "> 5%" as a preset-env target to test builds for more
    recent browsers; this will not use regeneratorRuntime for async/await.
  - added @babel/runtime as a dep for the possible case where we want to use
    @babel/plugin-transform-runtime; it has no effect otherwise.
- TODO: we need to consider a library build; either
  - @babel/plugin-transform-runtime (may polyfill _everything_ which is extreme)
  - useBuiltIns = false and assume consumers will uses @babel/present-env
    with useBuiltIns = 'entry'|'usage'
  - useBuiltIns = "usage" an option? See <https://github.com/babel/babel/issues/7267> .
  - <https://2ality.com/2017/07/npm-packages-via-babel.html> is old but interesting
    - `main` vs `module`
      - <https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for>
    - `esm` vs `cjs`
    - `targets` = `{node: current}` (@babel/preset-env)
- Notes
  - @babel/polyfill is deprecated from babel 7.4.
    - We need to add corejs and regenerator-runtime directly.
  - <https://github.com/babel/babel/issues/10271#issuecomment-528379505>
    "useBuiltIns [@babel/present-env option] and
    @babel/plugin-transform-runtime are mutually exclusive. Both are used to
    add polyfills: the first adds them globally, the second one adds them
    without attatching them to the global scope. You should decide which
    behavior you want and stick with it."
  - <https://github.com/babel/babel/issues/7267>
    - "The useBuiltIns features is great but its usage may not be appropriate
      for libraries because they affect the global scope.
      @babel/plugin-transform-runtime approach is nice but it does not
      currently supports targets like @babel/preset-env."

## 2020-04-15

- Merged latest node-master
- npm update
- Tried to replace babel-eslint with @babel/eslint\* but it's not ready yet, see version 8 babel.
- Added typescript via babel using <https://github.com/microsoft/TypeScript-Babel-Starter> as a guide.
  - had to add `--extensions '.ts,.js'` for `babel-node` and `babel` (cli) to work; this
    will build src/_.ts -> lib/_.js
  - `build:types` generates `lib/*.d.ts` declaration files also

## 2019-01-11 - 5th session

- Pulled node-master again.
  This brought in `nyc --all` to list all source files in `src/`
  in reports even if they're not required by a test file.
  However, I think this requires `instrument: true` but we
  require it to be `false` because of `babel-plugin-istanbul`.
  See <https://github.com/istanbuljs/nyc/issues/434> .
  Gonna just let this sit for a bit.
- FIX - we have to put `NODE_ENV=test` in "test:unit" run-script
  so that babel can detect it and apply istanbul.
  Removed it from `test/setup/unit.js`.
  - Also seems to make `nyc --all` work now - it picks up src/index.js
    which currently isn't required anywhere.

## 2019-01-11 - 4th session

- FIX mocha unit test setup - it should be
  `mocha ... src/**/*.spec.js test/unit`
  NOT `mocha ... src test/unit`. With the latter, mocha
  executes all files in `src/`. Then nyc will see that our code in
  src/ got executed and reports on it with better test coverage than
  it should have. (We don't actually test the boilerplate.js in
  boilerplate.spec.js (yet)).

## 2019-01-11 - 3rd session

- Followed recommended setup for babel / nyc (istanbul)
  - installed `babel-plugin-istanbul`
  - in `.nycrc.json`
    - set `instrument:false`, `sourceMap:false`
    - added require for @babel/register - though probably not necessary
  - added `lcov` reporter - see `coverage/` for html reports. NOTE
    that these reports count line executions against the sourcemapped
    original code in `src/` which is what we want.
- Set `NODE_ENV` to `test` in `test/setup/unit.js` - may need to revisit
  this. In `babel.config.js` we use `env: {}` to load `babel-plugin-istanbul`.

## 2019-01-11 - 2nd session

- Pulled node-master which brought in nyc.
- nyc appears to run without any further tweaks.
  I think because `mocha.opts` requires `@babel/register`, nyc
  seems to be ok.
- QUESTION: do we need to worry about source map settings for nyc?

  - Looks like we should:
    "nyc supports custom require hooks like @babel/register. nyc can
    load the hooks for you, using the --require flag.

    Source maps are used to map coverage information back to the
    appropriate lines of the pre-transpiled code. You'll have to
    configure your custom require hook to inline the source-map in
    the transpiled code. For Babel that means setting the sourceMaps
    option to inline."

    - <https://github.com/istanbuljs/nyc>

  - @babel/register can override babel configurations like this:
    `require('@babel/register')({ ...babel configs... })`
    So we might need to change how we load @babel/register.

## 2019-01-11

- Switched to @babel/polyfill in keeping with the other @babel updates - see last entry.
- Use `import @babel/polyfill` in the entry point (src/index.js) - potentially we can
  target this with babel-env's `useBuiltIns` to reduce the size - but see bug mentioned.
- `.babelrc` -> `babel.config.js` as used in the latest docs
  - Added notes about babel-env behaviour in `babel.config.js`
  - Set babel-env minimum targets to IE 11 and Chrome 50 - very conservative.
    This will trigger babel-env to use regenerator-runtime to transform async/await.
    Setting it to just chrome 71 will NOT transform async/await.
  - Ran into bug with `useBuiltIns: 'entry'` - it splits `import @babel/polyfill`
    but doesn't require the regenerator-runtime properly (AFAICT)
    - see <https://github.com/babel/babel/issues/8829>
- Removed babel plugins: `@babel/proposal-object-rest-spread` (stage-4, babel-env
  supports it), `@babel/transform-async-to-generator` (babel-env
  supports this, no need to have it explicitly)
- But, we keep these: `@babel/proposal-class-properties` (stage-3 atm, so babel-env
  won't handle it), `@babel/plugin-proposal-export-default-from`.

## 2019-01-09

- Merged github/node-master - see that boilerplate for recent changes.
- Switched to babel 7 (@babel/\*).
- Removed legacy decorator babel plugin.
- Replaced `babel-preset-es0215` with `@babel/preset-env`.
- Linting with prettier (after merging upstream).

### Issues

- Do we need to specify the other plugins eg class properties, object
  rest spread etc?
  - Answered in the entry after this.
- Need to configure / read up on `@babel/preset-env`.
  - Done. It basic pulls in any stage-4+ transforms in for us.
- Do we still need runtime generator? How does this play with
  @babel/preset-env?
  - Answered in the entry after this.

## 2018-04-27

- Merge github/node-master - brings in chai-as-promised.

## 2018-03-19

- Add `rm -rf lib/` to `build` run-script.
  Can get weird behaviour if we don't clear out the old especially
  if a function has been moved.

## 2017-11-18

- Merged latest node boilerplate.
  Not sure about `eslint-plugin-flowtype` which is in `dependencies`.
  It was already in `devDependencies` before the merge.

## 2017-08-19

### Added

- Trying out `babel-node` for `start`.
  For production we can directly call the prebuilt code in lib/.

## 2017-08-18

### Added

- Uses babel flow not `flow-remove-types` (unlike node).
