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

TODO: explore bundle splitting using routes.

## 2017-08-18
- Cleaned up `src/boilerplate` after merging react-master.
- Not sure if the division between `<Router>` and `<Switch>`
  in `src/boilerplate/{index.js,boilerplate.js}` is the best way to be doing things.
