/* eslint-disable @typescript-eslint/no-var-requires */
const spawn = require('child_process').spawn;

// See https://gallery.ecr.aws/lambda/nodejs for url
const URL = 'http://localhost:9000/2015-03-31/functions/function/invocations';

const event = JSON.stringify({
  requestContext: {},
  path: '/ping',
  httpMethod: 'GET',
  headers: {},
});

spawn(`curl -XPOST ${URL} -d '${event}'`, {
  stdio: 'inherit',
  shell: true,
});
