import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ecr from '@aws-cdk/aws-ecr';
import * as apigw from '@aws-cdk/aws-apigateway';

export interface HelloProps {
  DOCKER_IMAGE: string;
}

/**
 * Boilerplate construct.
 *
 * We demonstrate how to set up a lambda and api gateway to work with an
 * express app using @vendia/serverless-express.
 */
export class Hello extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: HelloProps) {
    super(scope, id);
    const repo = ecr.Repository.fromRepositoryName(
      this,
      'ECR',
      props.DOCKER_IMAGE,
    );

    const hello = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.FROM_IMAGE,
      code: lambda.Code.fromEcrImage(repo),
      handler: lambda.Handler.FROM_IMAGE,
      // To use reference a simple file without docker:
      //   runtime: lambda.Runtime.NODEJS_14_X,
      //   code: lambda.Code.fromAsset('local/disk/path/module-dir'),
      //   handler: 'hello.handler',
      // See https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html for more options.
    });

    // We test this boilerplate lambda in AWS console with a ping request using
    // API Gateway format for the test event:
    /*
    {
      "requestContext": {},
      "path": "/ping",
      "httpMethod": "GET",
      "headers": {}
    }
    */

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello,
    });

    // We should now be able to hit /ping
    // Go to "Stages" in API Gateway AWS console to get the "Invoke URL"
    // eg https://5yhtzbely0.execute-api.ap-southeast-2.amazonaws.com/prod/ping
  }
}
