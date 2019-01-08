# Node Boilerplate

Node boilerplate uses

- mocha for testing + sinon + chai/dirty-chai
- eslint for linting
- flow for optional typing

## 2019-01-09

- Removed docker configurations - added this on top of the boilerplate.
- Added `.npmignore`.
- Used `test/mocha.opts` for general mocha settings, simplified package.json.
- `main` should point to `lib/index.js`.
- Use `npm` instead of `yarn` - removed `yarn.lock`.

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
  Also see: https://github.com/mochajs/mocha/issues/1577 .
