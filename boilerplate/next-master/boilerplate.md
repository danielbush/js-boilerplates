
# Nextjs boilerplate

Nextjs boilerplate

- uses css modules and the *.module.css convention like create-react-app

- Nextjs is opinionated about routes
  - pages/_app.js
  - pages/index.js - homepage
- adding api routes
  - `pages/api/*` maps to `/api/*` routes
  - see <https://nextjs.org/docs/api-routes/introduction>
  - we have a `req` and `res` which map to objects in nodejs `http` module
- Nextjs has a curious way to add typescript.
    You create an empty tsconfig.json file and do `yarn dev` which fails with some instructions.
    The instructions involve installing some @types/ packages.
    Run `yarn dev` again and tsconfig.json is populated and next-env.d.ts is created.
    See <https://nextjs.org/docs/basic-features/typescript> .

## Synopsis

This boilerplate was created with:

```sh
npx create-next-app .
```

It uses yarn by default.

The main commands:

  yarn dev
    Starts the development server.

  yarn build
    Builds the app for production.

  yarn start
    Runs the built app in production mode.

## TODO

- typescript - <https://github.com/vercel/next.js/blob/canary/examples/with-typescript/pages/about.tsx>
- prettier / eslint setup - use node-master?
- combine nextjs with graphql
  - this seems like an obvious combination
- explore using auth0 (eg cognito)
- use nextjs with emotion
