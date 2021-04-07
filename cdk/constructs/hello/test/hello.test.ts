import { expect as expectCDK, countResources } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Hello from '../lib/index';

/*
 * Example test
 */
test('SNS Topic Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new Hello.Hello(stack, 'MyTestConstruct', {
    DOCKER_IMAGE: 'some-docker-image',
  });
  // THEN
  expectCDK(stack).to(countResources('AWS::SNS::Topic', 0));
});
