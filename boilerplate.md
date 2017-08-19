# Serverless Boilerplate

This is serverless on top of node.
No express here.

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
- Deploy of src/boilerplate works but is 18M.
- TODO: try this: https://www.npmjs.com/package/serverless-webpack-plugin and add webpack config.
