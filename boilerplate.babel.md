# Babel Boilerplate


Babel + flow.
Currently doesn't include postcss - see babel_react.

This acts as a base for a number of other configurations.

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
