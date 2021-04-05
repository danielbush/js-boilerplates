# Node Boilerplate

Node boilerplate uses

- jest for testing (includes in-built mocking and test coverage)
- eslint + prettier for linting

## 2021-04-03 - switch to jest

- Made jest the default testing library.  `node/other/mocha` contains mocha/chai/sinon.  I'm just keeping it for reference.
- Removed nyc because jest has `--coverage` etc

## 2021-04-03

- Major upgrade for all deps needing it.
- Replace mocha.opts and package.json args with .mocharc.js (probably because of mocha major bump).

## 2020-04-14

- Major upgrade for all deps needing it.
- Improve example test in boilerplate.spec.js.

## 2020-01-02

- Major upgrade for all deps needing it.
- Switched to node-config <https://github.com/lorenwest/node-config/wiki>.
  `config.get(...)` is used to get config values.
  `config/default.js` has default config values.
  Note: config.get will throw for missing values.
- Removed
  - dotenv-safe.
  - run-script check:env
- Removed nyc from `test:watch` - C-c during watch led to non-zero exit code and long npm message.

## 2019-01-11 - 3rd session

- Moved `NODE_ENV=test` into package.json `test:unit` run-script
  because of issues with downstream babel project - see entry
  from today in that project.
  The issue probably doesn't affect us here but being consistent.

## 2019-01-11 - 2nd session

- Backported lcov for report coverage, and fix for mocha running all files in `src/`
  which makes nyc report more than it should.
- In `.nycrc.json`, set `instrument: true` and in `package.json` use
  `nyc --all -- mocha ...` to get nyc to report on all non-test files
  in src/. Without this, nyc won't report on files that aren't required
  in your tests - obviously we want to see that some files have 0 coverage
  because they're not tested at all. These are the include/exclude settings
  I have at the moment (bit confused about how nyc handles these):
  - "include": ["src"],
  - "exclude": ["src/**/*.spec.js", "test"],
  - I think however this may clash with babel downstream where
    `instrument: false` is required for the `babel-plugin-istanbul`.
  - see <https://github.com/istanbuljs/nyc/issues/434> for similar issue.

## 2019-01-11

- Moved `test/mocha.opts` to `mocha.opts` using `--opts` option.
- Added `nyc` to `test:unit` for test coverage (`instanbul` instrumentation).
  Very easy setup because we aren't transpiling anything here.
- Using `nyc mocha` - prints test stats after running the tests
  which seems like a good default.
- Using `.nycrc.json` for configuration.
  - Use `exclude` option to ignore collocated `.spec.js` files in `src/`.

## 2019-01-09

- Removed docker configurations - added this on top of the boilerplate.
- Added `.npmignore`.
- Used `test/mocha.opts` for general mocha settings, simplified package.json.
- Removed `flow` - see branch `node-flow-master` and removed `build` run-script.
- `main` still points to `src/index.js` (but for flow, should have been `lib/index.js`).
- Use `npm` instead of `yarn` - removed `yarn.lock`.
- Upgraded to latest versions (`npm outdated`).
- Added `.prettierrc`, and use `plugin:prettier/recommended` in eslint.
  Packages: `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`.
  (taken from <https://prettier.io/docs/en/eslint.html> )
  `yarn run lint` works as expected with prettier.
- Linted project with prettier.
- Tidied up `CHANGELOG.md`.

## 2018-06-03

- Added eslint import resolver to show bad requires.
  This is already in node-babel, babel-react boilerplate and higher.

## 2018-04-27

- Added chai-as-promised. Not sure why it was missing.

## 2018-03-19

- Add `rm -rf lib/` to `build` run-script.
  Can get weird behaviour if we don't clear out the old especially
  if a function has been moved.

## 2017-11-18

### Added

- dirty-chai to always use function calls in chai assertions (eg expect(...).to.be.calledOnce()).

## 2017-11-12

### Added

- `version` run-script which bumps changelog
- NOTE: `npm version patch|minor|major` should work with this run-script
- Also, we could probably just use np which will do a bunch of extra things like
  running tests.

## 2017-09-11

### Changed

- Don't use docker entrypoint; so it's easier to run either node or yarn or npm.

## 2017-09-10

### Added

- Docker image creation.
  - `yarn run docker:build` will an image with node as entry point
  - `yarn run docker:run` should start the express server.
    It will run `node` with default argument `lib/index.js`

## 2017-09-11

### Added

- Added a check:env to verify .env file (dotenv-safe).

## 2017-09-82

### Changed

- Switched to `dotenv-safe` over `dotenv`.
  - the line to load it is included in src/index.js but is commented out

## 2017-08-18

### Added

- `flow-remove-types` which also gives us `flow-node` and `remove-flow-types/register`.
  - `start` uses `flow-node` - we can pretend this is just node if we don't want flow
  - `build` will build `src/` to `lib/` - if we want to package our node code.
  - This is all optional if we don't use flow.
  - To run a non-flow project in production, you will have to explicitly do `node src/index.js`
    instead of `yarn run start`.

### Fixed

- `test:watch` calls `test:unit` to get all the flags.

## 2017-08-06

- Added collocated tests which seem to be popular eg `src/file.js` and `src/file.spec.js`.
  Also see: <https://github.com/mochajs/mocha/issues/1577> .
