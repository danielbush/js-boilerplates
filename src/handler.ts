/**
 * https://github.com/vendia/serverless-express replaces aws-serverless-express.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html
 */

import serverlessExpress from '@vendia/serverless-express';
import app from './app';

export const handler = serverlessExpress({ app });
