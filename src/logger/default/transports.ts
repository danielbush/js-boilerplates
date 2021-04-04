import config from 'config';
import { defaultFileTransport } from './defaultFileTransport';
import { defaultConsoleTransport } from './defaultConsoleTransport';

const LOG_FILE: string | null = config.get('LOG_FILE');
const LOG_LEVEL: string = config.get('LOG_LEVEL');
const HTTP_LOG_LEVEL: string = config.get('HTTP_LOG_LEVEL');

const transports = [defaultConsoleTransport(LOG_LEVEL)];
// We may want to ship http logs somewhere:
const httpTransports = [defaultConsoleTransport(HTTP_LOG_LEVEL)];

if (typeof LOG_FILE === 'string') {
  transports.push(defaultFileTransport(LOG_LEVEL, LOG_FILE));
}

export { transports, httpTransports };
