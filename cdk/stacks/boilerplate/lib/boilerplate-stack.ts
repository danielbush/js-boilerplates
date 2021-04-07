process.env.NODE_CONFIG_DIR = `${__dirname}/../../../../config`;
import * as config from 'config';
import * as cdk from '@aws-cdk/core';
import { Hello } from '../../../constructs/hello';

export class BoilerplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new Hello(this, 'HelloBoilerplate', {
      DOCKER_IMAGE: config.get('DOCKER_IMAGE'),
    });
  }
}
