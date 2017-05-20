# React Boilerplate

## [Unreleased]

### Added

- flow
  - example showing `props:` in es6 components
- `yarn run check` - runs flow and linting
- np - use `np --no-publish`
- `version` run-script (hook) to update changelog for np
- added eslint default for react - eslint-plugin-react

### Changed


### Fixed

## [1.0.0] - 2017-05-13

This includes initial work version 0.0.1.

- webpack 2
  - should also give us tree-shaking (apparently)
- style-loader and css-loader
  - note that these use some postcss plugins already
  - `css-loader` uses `postcss-modules-*`
- `cssnext`
  - a set of curated postcss plugins - http://cssnext.io/features/
    that map to css proposals
  - doesn't seem to include `postcss-modules-` ?
  - css vars: `:root { --some-var: <val> }` where `<val>` could
    be a colour eg `red` or event a **css rule block**
  - we can `@apply` these vars, which **injects** them
  - `&` for nesting - see http://tabatkins.github.io/specs/css-nesting/
    - `table { & td ...` = `table td`
    - `table { &.c ...}` = `table.c`
  - a lot more...
- `postcss-modules-*`
  - **TODO** brought in by `css-loader`, make explicit?
  - https://github.com/css-modules/css-modules - **the standard**
  - 3 key things:
    - scoping of class names (and animations)
      - postcss-modules-scope
        - this means that when we import class `.foo` into a js file,
          we get something unique.  No other `.foo` in some other component
          on the same page can clash with us
    - composition
      - `composes: <className>` = "inject rules for other classname"
    - values (`@value`)
      - `postcss-modules-values`
- `postcss-modules-extract-imports`
  - https://github.com/css-modules/postcss-modules-extract-imports (in css-loader)
  - in css-loader
  - handles: `composes: className [... className] from "path/to/file.css";`
  - TODO: also makes reference to `:import` - where does this come from?
- `postcss-import`
  - is a devDependency I put in that gives us `@import`
  - TODO: do we need it?
- `postcss-module-values`
  - gives us `@value` and ability to import that into js
  - https://github.com/css-modules/postcss-modules-values
    - yes, we can require css values into js
    Sep-2015:
    "Hey friends, I've got an implementation of a legit extension to
    CSS Modules that I think we should adopt, fully, in core, and tell
    people to use it. I.e. this would become the third of three
    features (local scoping & composition are the first two), so this
    is a reasonably big change to our public API.
    But I think it's the final piece of the puzzle to make CSS Modules
    really capable of changing the way people structure their CSS."
  - https://github.com/css-modules/css-modules-loader-core/pull/28#issuecomment-142857169

