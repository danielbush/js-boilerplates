/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const spawn = require('child_process').spawn;

const DOCKER_IMAGE = config.get('DOCKER_IMAGE');

spawn(`docker build -t ${DOCKER_IMAGE} .`, {
  stdio: 'inherit',
  shell: true,
});
