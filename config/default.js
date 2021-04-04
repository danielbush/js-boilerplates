module.exports = {
  PORT: process.env.PORT || 3000,

  // Standard winston (npm) log levels
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // See logger/httpLogger.ts
  HTTP_LOG_LEVEL: process.env.HTTP_LOG_LEVEL || 'http',

  // If we want file logging:
  LOG_FILE: null,
};
