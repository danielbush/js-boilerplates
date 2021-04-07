# express-graphql

This patch uses express-graphql - <https://github.com/graphql/express-graphql> .

Related: <https://graphql.org/graphql-js/running-an-express-graphql-server/>

Smoke test

Use the tests for node/ts/patch/express .

In addition

- <http://localhost:3000/graphql> - should show graphiql which is part of `express-graphql`; controlled by `GRAPHIQL` config
- <http://localhost:3000/playground> - should show graphql playground for `/graphql` - <https://github.com/graphql/graphql-playground>
