
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
- typescript
  - <https://nextjs.org/docs/basic-features/typescript>
    - explains how to import types for various parts of the nextjs system
  - Nextjs has a curious way to add typescript.
    - You create an empty tsconfig.json file and do `yarn dev` which fails with some instructions.
      The instructions involve installing some @types/ packages.
      Run `yarn dev` again and tsconfig.json is populated and next-env.d.ts is created.
      See <https://nextjs.org/docs/basic-features/typescript> .
- pages/_app.js
  > Next.js uses the App component to initialize pages.
  > To override, create the ./pages/_app.js file and override the App class
- pages/_document.js
  > Pages in Next.js skip the definition of the surrounding document's
  > markup.  For example, you never include html, body, etc.  To override
  > that default behavior, you must create a file at ./pages/_document.js,
  > where you can extend the Document class.
  - Note: _document.js is only rendered on the server side and not on the client side.  so event handlers like onClick is not going to work.
- next routing maps to your directory structure
  - dynamic route segments are files that have use `[]`
  - `[...foo]` lets you do a catchall
  - `[[...foo]]` is optional catchall
  - For example, `pages/post/[[...slug]].js` will match /post, /post/a, /post/a/b, and so on.
- prop fetching
  - getServerSideProps - <https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering>
    - = "Fetch data on each request."
  - getStaticProps - <https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation>
    - = "Fetch data at build time"
  - getInitialProps - don't use; use the above

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
- use pages/api/boilerplate in boilerplate example
- can we use pages/api/boilerplate for getServerSideProps()?
- combine nextjs with graphql
  - this seems like an obvious combination
- explore using auth0 (eg cognito)
- use nextjs with emotion

## Test

<http://localhost:3000> is blank
<http://localhost:3000/boilerplate>
