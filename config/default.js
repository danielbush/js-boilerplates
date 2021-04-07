/* eslint-disable @typescript-eslint/no-var-requires */
const defer = require('config/defer').deferConfig;

module.exports = {
  PORT: process.env.PORT || 3000,

  // Standard winston (npm) log levels
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // See logger/httpLogger.ts
  HTTP_LOG_LEVEL: process.env.HTTP_LOG_LEVEL || 'http',

  // If we want file logging:
  LOG_FILE: null,

  ECR_URI: defer(function () {
    return `${this.ACCOUNT}.dkr.ecr.${this.REGION}.amazonaws.com/${this.DOCKER_IMAGE}`;
  }),

  DOCKER_IMAGE: 'serverless-express', // change
  ACCOUNT: 'XXXXXXXXXXXX', // change
  REGION: 'ap-southeast-2', // change
};
