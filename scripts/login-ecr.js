/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const spawn = require('child_process').spawn;

const REGION = config.get('REGION');
const ECR = config.get('ECR');

spawn(
  `aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ECR}`,
  { stdio: 'inherit', shell: true },
);
