# Node Boilerplate

This acts as a base for a number of other configurations.

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
  - `build` will build `src/` to `lib/` -  if we want to package our node code.
  - This is all optional if we don't use flow.
  - To run a non-flow project in production, you will have to explicitly do `node src/index.js`
    instead of `yarn run start`.
### Fixed
- `test:watch` calls `test:unit` to get all the flags.
  
## 2017-08-06
- Added collocated tests which seem to be popular eg `src/file.js` and `src/file.spec.js`.
  Also see: https://github.com/mochajs/mocha/issues/1577 .
