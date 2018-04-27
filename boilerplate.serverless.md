# Serverless Boilerplate

This is serverless on top of node.

- Does not use express.
- Uses babel, not remove-flow-types.
- Babel gives us async/await and spread operator and flow.
- Stick to using `require` and `module.exports` because lambda is backend node code.
- When we switch to node 8 runtime we get async/await and we can maybe consider simplifying
  and using `remove-flow-types` instead of babel.

## 2018-04-27
- Merged latest from github/node-master - hadn't done this for a while - probaby broke something.
  - docker run-scripts look to have been added - not sure if we really need them?
  - `start` run-script runs `src/index.js` not `lib/index.js` (already using babel-node).

## 2017-08-19
### Added
- Upgraded from node_master which uses `remove-flow-types`.
  But we are using babel.
- Added `babel-register`.
- Use `babel-node` for `start`

