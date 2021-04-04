import type { Request, Response, NextFunction } from 'express';
import errorhandler from 'errorhandler';
import logger from '../../logger/logger';

const basicHandleError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).send('Unexpected error');
};

// errorhandler is for development:
// http://expressjs.com/en/resources/middleware/errorhandler.html

const handleError =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    ? errorhandler()
    : basicHandleError;

export { handleError };
