import logger from './logger';
import app from './app';
import { get } from 'config';
const PORT = get('PORT');

app.listen(PORT);
if (process.env.NODE_ENV !== 'test') {
  logger.info(`Listening on port ${PORT}`);
  logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
}
