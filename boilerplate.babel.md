# Babel Boilerplate

Upstream: node-master

Babel boilerplate takes the node boilerplate and addes babel.

Notable:

- @babel/node (babel-node)
- @babel/register (node -r @babel/register)
- @babel/preset-env (which is the successor to babel-preset-es2015)

Currently doesn't include postcss - see babel_react.

## 2019-01-09

- Merged github/node-master - see that boilerplate for recent changes.
- Switched to babel 7 (@babel/\*).
- Removed legacy decorator babel plugin.
- Replaced `babel-preset-es0215` with `@babel/preset-env`.
- Linting with prettier (after merging upstream).

### Issues

- Do we need to specify the other plugins eg class properties, object
  rest spread etc?
- Need to configure / read up on `@babel/preset-env`.
- Do we still need runtime generator? How does this play with
  @babel/preset-env?

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
