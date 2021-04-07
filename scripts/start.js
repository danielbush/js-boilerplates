/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const spawn = require('child_process').spawn;

const DOCKER_IMAGE = config.get('DOCKER_IMAGE');

spawn(
  `docker rm -f test 2>/dev/null; docker run --rm --name test -p 9000:8080 ${DOCKER_IMAGE}`,
  {
    stdio: 'inherit',
    shell: true,
  },
);
