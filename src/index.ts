import logger from './logger/logger';
import app from './app';
import config from 'config';

const PORT = config.get('PORT');
app.listen(PORT);
logger.info(`Listening on port ${PORT}`);
logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
logger.info(`NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}`);
