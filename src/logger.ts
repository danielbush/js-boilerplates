import { createLogger, transports, format as _format } from 'winston';

const logger = createLogger({
  exitOnError: false,
});

logger.add(
  new transports.Console({
    level: process.env.LOG_LEVEL || 'debug',
    handleExceptions: true,
    format: _format.combine(_format.colorize(), _format.simple()),
  }),
);

if (process.env.LOG_FILE) {
  // https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport
  logger.add(
    new transports.File({
      level: process.env.LOG_LEVEL || 'info',
      filename: process.env.LOG_FILE || './logs/app.log',
      format: _format.combine(_format.simple()),
      handleExceptions: true,
      maxsize: 5242880, // 5M
      maxFiles: 5,
    }),
  );
}

export default logger;
// export const stream = {
//   write: function (message, encoding) {
//     logger.info(message);
//   },
// };
