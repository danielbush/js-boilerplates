import winston, { createLogger } from 'winston';
import { httpTransports } from './transports';

export const HTTP_LOG_LEVELS = { nohttp: 0, http: 1 };
export const HTTP_LOG_COLORS = { nohttp: 'red', http: 'blue' };

winston.addColors(HTTP_LOG_COLORS);

const httpLogger = createLogger({
  levels: HTTP_LOG_LEVELS,
  transports: httpTransports,
});

export default httpLogger;
