import winston, { transports, format } from 'winston';

export const defaultConsoleTransport = (level: string): winston.transport =>
  new transports.Console({
    level,
    format: format.combine(format.colorize(), format.simple()),
  });
