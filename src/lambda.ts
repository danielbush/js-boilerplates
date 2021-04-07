/**
 * Wraps your express app so that it cna run inside a lambda.
 */

import serverlessExpress from '@vendia/serverless-express';
import _app from './app';

export const app = serverlessExpress({
  app: _app,
});
