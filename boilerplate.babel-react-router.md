# React Router Boilerplate

This is node_babel_react + react router.
Specifically we use `react-router-dom` which uses `react-router`.

Webpack builds 2 bundles (entry points)
- boilerplate
- main

These are built in build/.

Webpack devserver serves files in public/.
- public/index.html does not load any js
- public/boilerplate.html loads /assets/boilerplate.js which maps to the boilerplate entry point

Point your brower to /boilerplate.html

The boilerplate entry point is src/boilerplate/index.js .
It specifies 2 routes (pages) that are simple div's with a Link tag pointing to the other page.
- /
- /flow
- NOTE: for / or /flow to work, you first have to point your browser to /boilerplate.html

TODO: explore bundle splitting using routes.

## 2017-11-19
- Updated boilerplate.
- TOOO: /flow route doesn't actually do any flow; tbh, I think it's orthogonal to what we're doing
  here, so maybe a better name for this route?
- Fix use of dotenv and dotenv-safe - probably have to ensure this is the case for other boilerplates.

## 2017-08-18
- Cleaned up `src/boilerplate` after merging react-master.
- Not sure if the division between `<Router>` and `<Switch>`
  in `src/boilerplate/{index.js,boilerplate.js}` is the best way to be doing things.
