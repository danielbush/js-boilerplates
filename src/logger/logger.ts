import { createLogger } from 'winston';
import { transports } from './transports';

const logger = createLogger({
  transports,
});

export default logger;
