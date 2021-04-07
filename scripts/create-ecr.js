/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const spawn = require('child_process').spawn;

const DOCKER_IMAGE = config.get('DOCKER_IMAGE');
const REGION = config.get('REGION');

spawn(
  `aws ecr create-repository --repository-name ${DOCKER_IMAGE} --region ${REGION}`,
  {
    stdio: 'inherit',
    shell: true,
  },
);
