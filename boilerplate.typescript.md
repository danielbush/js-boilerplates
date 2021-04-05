# Typescript/Node Boilerplate

Upstream: node/master

Node typescript boilerplate uses

- jest (includes mocking and coverage)
- eslint + prettier for linting
- smoke test
  - npm test
  - npm run boilerplate
  - npm run boilerplate:dev

## 2021-04-06

- put boilerplate in `boilerplate/node-ts-master/` and updated `npm run boilerplate`

## 2021-04-03

- merge latest `node/master`
  - brings in `jest` and `ts-jest` to run tests
- set `rootDir` in tsconfig to `./`
  - this allows us to keep config/ files as *.js
  - and not have issues with ts-node
  - if we use config/*.ts compile code will fail to import
  - if we use config/*.js ts-node gets uppity because it's outside `rootDir = "src"`
  - to check the set up works run both `npm run boilerplate` and `npm run boilerplate:dev` since one is using `tsc` and the other is using `ts-node`.
  - as a result, tsc will build ot `build/src/*` not `build/*`
    - this feels a little hacky but resolves issues with `config` and `tsc`
  - related
    - <https://stackoverflow.com/questions/58095165/emit-skipped-when-parsing-config-typescript-files>
- `config/` (node-config)
  - it wants to live in the root of the project
  - I think this is fine for packaging (npm) and building images (servers)
  - but be aware that we build all code in src/ to build/

## 2020-06-07

- Added `npm run check` and `npm run check:types`.
  - `eslint src/ test/` failed on test/ even though there _is_ a ts file in there.
    Not sure what is going on. Using `--no-error-on-unmatched-pattern` for the moment.
    <https://stackoverflow.com/questions/54543063/how-can-i-suppress-the-no-files-matching-the-pattern-message-in-eslint>
- It's worth reading <https://www.npmjs.com/package/@typescript-eslint/parser> as it appears
  to be the basis for using eslint with typescript including eslint rules that could only
  apply to ts
- @typescript-eslint is the companion for this parser with ts rules. Trying to keep things
  simple by extending the recommended set.
  <https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin>

## 2020-04-14

- Merge latest from node-master
- NOTE: <https://github.com/Microsoft/TypeScript-Node-Starter#typescript--node> is a good guide to follow.

## 2020-01-02

- Started this project.
- Based on <https://dev.to/theghostyced/setting-up-a-node-typescript-project-in-under-4-minutes-4gk2>
- `tsconfig.json` defines the project for typescript.
  We specify `allowJs: true` to allow us to import files.
