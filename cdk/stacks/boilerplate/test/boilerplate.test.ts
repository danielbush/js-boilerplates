import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Boilerplate from '../lib/boilerplate-stack';

test('Empty Stack', () => {
  return;
  const app = new cdk.App();
  // WHEN
  const stack = new Boilerplate.BoilerplateStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT,
    ),
  );
});
