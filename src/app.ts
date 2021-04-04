import express from 'express';
import morgan from './morgan';
import logger from './logger/logger';
import * as routes from './routes/routes';

const app = express();
app.use(morgan);

// Put your routes here:
app.use('/ping', routes.ping);
app.use('/health', routes.health);
app.use('/bad', routes.bad);

// Special routes
app.use(routes.catchAll); // 404 catch all
app.use(routes.handleError); // Catch errors

// https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', (err) => {
  if (err instanceof Error) {
    logger.error('uncaughtException: ' + err.message, { stack: err.stack });
  } else {
    logger.error('uncaughtException', err);
  }
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  if (err instanceof Error) {
    logger.error('unhandledRejection: ' + err.message, { stack: err.stack });
  } else {
    logger.error('unhandledRejection', err);
  }
  process.exit(1);
});

export default app;
