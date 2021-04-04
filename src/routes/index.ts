import ping from './ping';
import health from './health';
import graphql from './graphql-boilerplate';
import type { Application } from 'express';

export default (app: Application): void => {
  app.use('/ping', ping());
  app.use('/health', health());
  app.use('/graphql', graphql());
};
