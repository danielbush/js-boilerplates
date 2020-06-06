# Typescript/Node Boilerplate

Upstream: node

Node typescript boilerplate uses

- mocha for testing + sinon + chai/dirty-chai
- eslint + prettier for linting
- nyc for test coverage

## 2020-06-07

- It's worth reading https://www.npmjs.com/package/@typescript-eslint/parser as it appears
  to be the basis for using eslint with typescript including eslint rules that could only
  apply to ts
- @typescript-eslint is the companion for this parser with ts rules. Trying to keep things
  simple by extending the recommended set.
  https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin

## 2020-04-14

- Merge latest from node-master
- NOTE: https://github.com/Microsoft/TypeScript-Node-Starter#typescript--node is a good guide to follow.

## 2020-01-02

- Started this project.
- Based on https://dev.to/theghostyced/setting-up-a-node-typescript-project-in-under-4-minutes-4gk2
- `tsconfig.json` defines the project for typescript.
  We specify `allowJs: true` to allow us to import files.
