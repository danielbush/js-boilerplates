import { Router } from 'express';
import expressPlayground from 'graphql-playground-middleware-express';

const playground = ({ endpoint }: { endpoint: string }): Router => {
  const router = Router();
  router.get('/', expressPlayground({ endpoint }));
  return router;
};

export { playground };
