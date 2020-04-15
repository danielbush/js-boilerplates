# Babel Boilerplate

Upstream: node-master

Babel boilerplate takes the node boilerplate and adds babel.

This setup buys us the following things in an es6+ environment:

- linting (prettier + eslint),
- tests (mocha),
- test coverage (nyc),
- building (to `lib/`)
- cli execution (`npm run start`)

Notable:

- @babel/node (babel-node)
- @babel/register (node -r @babel/register)
- @babel/preset-env (which is the successor to babel-preset-X)
- Doesn't include postcss - see babel_react.

## 2020-04-15

- Merged latest node-master
- npm update
- Tried to replace babel-eslint with @babel/eslint\* but it's not ready yet, see version 8 babel.

## 2019-01-11 - 5th session

- Pulled node-master again.
  This brought in `nyc --all` to list all source files in `src/`
  in reports even if they're not required by a test file.
  However, I think this requires `instrument: true` but we
  require it to be `false` because of `babel-plugin-istanbul`.
  See https://github.com/istanbuljs/nyc/issues/434 .
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

    - https://github.com/istanbuljs/nyc

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
    - see https://github.com/babel/babel/issues/8829
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
