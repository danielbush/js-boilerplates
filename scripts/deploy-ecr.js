/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const spawn = require('child_process').spawn;

const DOCKER_IMAGE = config.get('DOCKER_IMAGE');
const ECR_URI = config.get('ECR_URI');
const tag = `docker tag ${DOCKER_IMAGE}:latest ${ECR_URI}:latest`;
const push = `docker push ${ECR_URI}:latest`;

spawn(`${tag} && ${push}`, {
  stdio: 'inherit',
  shell: true,
});
