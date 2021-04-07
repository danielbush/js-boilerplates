import config from 'config';
import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// See https://graphql.org/graphql-js/running-an-express-graphql-server/

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const graphqlExample = Router();

graphqlExample.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      hello: () => {
        return 'Hello world!';
      },
    },
    graphiql: config.get('GRAPHIQL'),
  }),
);

export { graphqlExample };
