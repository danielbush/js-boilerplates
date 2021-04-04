# Express Boilerplate

- Based on `node/ts/master`
- Routes are mounted from src/routes
  - src/routes/foo.js => /foo/*
  - disable or add to this as required
- Includes
  - serverless-express (src/handler.js)
    - replaces aws-serverless-express (src/handler.js)
  - graphql/express-graphql
- smoke test
  - `npm run lint`
  - `npm run boilerplate` tests basic things
  - `npm test` - unit / integration tests in jest
  - `npm run dev` - run server in dev: <http://localhost:3000/ping>
    - check console log
  - `npm run build && npm start` - start after building: <http://localhost:3000/ping>

## TODO

- patch: apollo graphql
- patch: next js

## 2021-04-05

- Merged `node/ts/master` - this is the new base now not node/master.
  - things like flow-types should be gone now
  - mocha/chai/sinon replaced with jest
  - typescript by default
- Notes on supporting .js
  - `npm run boilerplate` requires .js as a test
    - if we try to require a .js, we run into an issue with tsconfig.json's rootDir
    - <https://github.com/TypeStrong/ts-node/issues/693>
    - and <https://github.com/microsoft/TypeScript/issues/9858>

## 2021-04-03

- Updated to latest major deps
  Used: `npx npm-check-updates -u` to do major bumps for package.json.
  Added .prettierrc.js from node/master manually because code was getting formatted.
  Had to tweak winston - it looks cleaner now with winston@3.x.
- Replaced bodyparser.json() with express.json()
  <https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4>

## 2018-04-27

- Merged latest github/node-master - adds chai-as-promised.

## 2018-01-21

- Added error handler after routes which will do `logger.error` and return
  a 500 Unexpected Error.
- Removed src/container.js.
  src/routes/index.js explicitly loads routes.
  src/index.js will call `routes(app)`.

## 2017-11-19

### Changed

- Moved "integration" test for ping into src/routes/ping/index.spec.js
  - I think it makes sense to have tests next to the code we create.

## 2017-11-14

### Fixed

- Fixed boilerplate integration test (express + container + chai-http).
  - I thinking we should make src/index make as few decisions as possible
    eg even morgan logging.

## 2017-11-12

### Changed

- Merged node boilerplate.
  - adds changelog bumping

## 2017-10-15

### Added

- Added /health for health checks - should be standard practice. It just returns a 200.
  <https://docs.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring> .

## 2017-09-11

### Changed

- Don't use docker entrypoint; so it's easier to run either node or yarn or npm.

## 2017-09-11

### Changed

- Don't use docker entrypoint; so it's easier to run either node or yarn or npm.

## 2017-09-10

### Added

- Docker image creation.
  - `yarn run docker:build` will an image with node as entry point
  - `yarn run docker:run` should start the express server.
     It will run `node` with default argument `lib/index.js`

## 2017-09-03

### Changed

- Container uses <dir> in routes/<dir> as the mount point.
  We specify a mount point at the route level - not our decision to make.
- json body parser is handled at the route-level.
  src/index.js and the container don't set this.
- Move setting `NODE_ENV` and `PORT` defaults to `src/index.js`.
- src/index.js invokes app.listen() (not src/container).
  This is because I think we want container to run in aws-serverless-express.
- Moved app creation and logging to src/index.js.
- Decided to add src/handler.js (aws-serverless-express) into this boilerplate.
  - NOTE: aws-serverless-express assumes you are using an "api proxy"
    in api gateway
- Decided to add graphql (graphql / express-graphql) into this boilerplate.
- Removed use of async/await in container code because I want to just run
  this in lambda.
  The counter-argument here is if I find myself doing immutable stuff and
  wanting to use object-spread, then it would have been better to just adopt
  babel/babel-register/babel-node for dev environment rather than flow/flow-node.
- `DISABLE` touch file - if file is present in src/routes/some_route/DISABLE
  then the container won't load that route.
  Should be an easy way to disable boilerplate code in real projects.

## 2017-09-02

### Added

- Added express-graphql and graphql
- Added `/graphql-boilerplate` endpoint for demo graphql behaviours.
- <http://localhost:3000/graphql-boilerplate> will show graphiQL in development mode.
- morgan for logging format
- winston (`require logger from src/logger`)
  - setting `LOG_FILE` will get winston to additional log to LOG_FILE
- debug (eg set env to `DEBUG=container:*`)
- NODE_ENV assumes 'development' by default (in container.js)
- use nodemon in `yarn run start` - yarn run start is purely for dev.
- merged node boilerplate
