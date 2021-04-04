import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

export default (): Router => {
  const router = Router();
  router.use(
    '/',
    graphqlHTTP({
      schema: schema,
      rootValue: {
        hello: () => {
          return 'Hello world!';
        },
      },
      graphiql: process.env.NODE_ENV === 'development',
    }),
  );
  return router;
};
