import winston, { transports, format } from 'winston';

export const defaultFileTransport = (
  level: string,
  filename: string,
): winston.transport =>
  // https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport
  new transports.File({
    level,
    filename,
    format: format.combine(format.simple()),
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
  });
