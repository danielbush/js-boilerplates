import morgan from 'morgan';
import httpLogger from './logger/httpLogger';

// HTTP request logging
//
// Taken from https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342

const morganMiddleware = morgan(
  // See http://expressjs.com/en/resources/middleware/morgan.html for tokens.
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Write to winston/logger not console.log.
      write: (message) => {
        httpLogger.log('http', message);
      },
    },

    // NOTE: winston may suppress http logging regardless of this, see 'stream'.
    skip: () => process.env.NODE_ENV === 'test',
  },
);

export default morganMiddleware;
