# Babel / React / Emotion Boilerplate

Extends node/babel/patch/react with emotion.
node/babel/patch/react supports css modules, typescript, babel, webpack.

Smoke test:
Use the smoke tests for node-babel-patch-react/boilerplate.md .

## TODO

- include global emotion css
- custom css variables in emotion?? -- seems pointless - we have js and the full module system

## 2021-04-07

- Tried to import `styles.js` into `hello-ts-func.tsx` but vscode tsc will complain that the module has no definition.
  To avoid an error, we can use `allowJs`.
  But this breaks `build:types` (`tsc --emitDeclarationOnly`) - tsc ends up choking on a million things inside `node_modules/` - a lot of them seem to related to webpack or webpack modules.
  We could use `--skipLibCheck` for `tsc` which may work but this means tsc is skipping type checking of declaration files -- maybe this is ok, but not sure.
  The other option is to define a .d.ts file on the same local path: <https://stackoverflow.com/questions/53074172/typescript-declaration-files-for-local-js-files>
  But is it worth it?
  **My conclusion is: don't try to import local js into local ts.**
  If we're converting a js repo, we should start from the local leaf modules.
  If a (non-local) dep has no definitions, we can `declare module` on it.

## 2021-04-05

- Updated latest
- Updated all major deps
  - emotion 10 -> 11
    - @emotion/core -> @emotion/react
- webpack 4 -> 5
  - <https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs>
  - use `webpack serve ...`
    - still requires `webpack-dev-server`
- css prop and typescript
  - <https://emotion.sh/docs/emotion-11#css-prop-types>
  - <https://github.com/emotion-js/emotion/issues/2111>
  - doing <https://github.com/emotion-js/emotion/issues/2111#issuecomment-732763318>
      "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "@emotion/react",

## 2020-05-16

- `@emotion/babel-preset-css-prop` must be run BEFORE `@babel/preset-env`
  `npm run test` was failing because @babel/registry generates cjs
  files (converts import to require) but the css prop preset would then insert
  an `import` statement. node would then fail to run with the mixed module
  setup.
