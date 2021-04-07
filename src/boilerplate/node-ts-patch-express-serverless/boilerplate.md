# serverless-express

An implementation of <https://github.com/vendia/serverless-express>.
We upload an express app via docker to AWS Lambda.  It makes sense to put API Gateway in front of this setup.

This is the "lambda-lith" pattern.
See <https://github.com/cdk-patterns/serverless/blob/main/the-lambda-trilogy/README.md>
Also see <https://cdkpatterns.com/patterns/filter/?by=Express>.

We don't use aws-cli to deploy lambda code, although you could.
Instead we use CDK which can deploy bundles (zip files, files, directories probably) or docker images. We use the docker image method for uploading the lambda using `public.ecr.aws/lambda/nodejs:latest`.  If you want to use a bundle, you will probably need to a bundling tool.

For simple lambda's, you can probably avoid bundling and docker.
But this boilerplate is about running an express app in a lambda which is far from simple.

There are 2 parts to the boilerplate:

- build/deploy a **simple lambda** without having to worry about express / api gateway and api gateway events
- build/deploy an **express lambda** which uses express and includes an api gateway mapping

## TODO

- how do we integrate cdk into an existing repo?
  - <https://www.reddit.com/r/aws/comments/kib3gg/cdk_project_best_practices/>
- use docker build stages to build with dev inside docker and then npm i with --production; how do I build and do --production?
- programmatic cdk?
  - Can we invoke progammatically and pass cdk.StackProps?
    <https://taimos.de/blog/deploying-your-cdk-app-to-different-stages-and-environments>
- would be interesting to explore CDK pipelines; this is mentioned in the CDK workshop, see: <https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines.html>
- document api gateway with swagger?

## Simple Lambda

This is a lambda that does not use express and is not configured for api gateway.
It allows us to test building a docker image and deploying it to ecr and lambda.
This may help when updating the boilerplate or learning the fundamentals.

The code for this lambda is in this boilerplate directory.
Once you build the docker image you can manually deploy it using AWS console, referencing the docker image pushed into ECR.

```sh
npm run boilerplate  # runs node/ts/master
npm run boilerplate:dev  # runs node/ts/master but uses ts-node

# Build/test AWS Lambda docker image and push to ECR
export IMAGE=simple-lambda
export ACCOUNT=xxxxxxxxxxxx
export AWS_REGION=ap-southeast-2
export AWS_PROFILE=demo
npm run boilerplate:test
```

Deploy the above by creating a docker-based lambda function in the AWS console.

It's not worth setting up deployment. See Express Lambda where we build an express-based lambda and deploy it using CDK.

## Express Lambda

We deploy the full express boilerplate lambda with express and put an api gateway in front of it.

- we wrap @vendia/serverless-express around our express app
- we need to pay more attention to the type of events that get passed to our lambda because @vendia/serverless-express needs to pass it to express like a request - see Events in appendix below; we handle api gateway type events
- we use docker/ECR to deploy the lambda

### Set up `config/local.js`

NOTE: you can set up secrets in `config/local.js` which is gitignored and overrides `config/default.js`.  You should probably edit the default.js file.

```js
module.exports = {
  ACCOUNT: 'XXXXXXXXXXXX',
  REGION: 'ap-southeast-2',
  DOCKER_IMAGE: 'serverless-express',
};
```

```sh
# Run express and ping it...
npm run dev
curl http://localhost:3000/ping # => response: pong

# Create an AWS lambda in docker using our app and test ping again:
npm run docker:build
npm run docker:start
npm run docker:ping # do this in another terminal
  # => {"statusCode":200,"body":"{\"response\":\"pong\"}","multiValueHeaders":{"x-powered-by":["Express"],"access-control-allow-origin":["*"],"content-type":["application/json; charset=utf-8"],"content-length":["19"],"etag":["W/\"13-nC6a2uDc6VTBNTJ8KNdzBOMRETY\""]},"isBase64Encoded":false}

# Push DOCKER_IMAGE to AWS ECR and deploy
export AWS_PROFILE=demo # change to whatever
npm run create:ecr # one-time
npm run login:ecr
npm run docker:deploy:ecr
npm i -g aws-cdk # one-time
npm run deploy:boilerplate
```

`deploy:boilerplate` will build a cdk `hello` construct (`cdk/constructs/hello`) and then build and deploy a cdk boilerplate stack (`cdk/stacks/boilerplate`) that uses the `hello` construct.

You can build a `npm run deploy` command with your own CDK stack and constructs.

Some technical notes on CDK:

- we set `process.env.NODE_CONFIG_DIR` at the top of `cdk/stacks/boilerplate/bin/boilerplate.ts` to make `config` use the config for the outer project (this boilerplate)
- `cdk/stacks/boilerplate/lib/boilerplate-stack.ts` is relatively simple stack; we could put all our logic in here, but I'm putting it in constructs like `cdk/constructs/hello` instead; this will keep the stack simple and built out of parts (constructs)

### Troubleshooting

```sh
docker exec -it test bash -l # cd /var/task
```

## Appendix: Resources

- workshop (recommended)
  - <https://cdkworkshop.com/20-typescript.html>

- CDK and assets (and bundling)
  - <https://aws.amazon.com/blogs/devops/building-apps-with-aws-cdk/>
    - talks about Golang and how you have to build an executable before deploying
  - <https://docs.aws.amazon.com/cdk/latest/guide/assets.html>
  - <https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html>
    - Code.fromEcrImage, Code.fromAsset etc
  - cdk has a "BundlingOptions" module - it is docker
  - bundling using webpack <https://github.com/vendia/serverless-express/tree/mainline/examples/basic-starter-api-gateway-v1>

Without docker, we can use `fromAsset`:

```js
    const hello = new lambda.Function(this, 'HelloCdk', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });
```

Not sure if there is bundling here or with other non-docker lambda.Code.\* methods.  Docstring for `fromAsset` says: `Either a directory with the Lambda code bundle or a .zip file.`  Digging into the code it appears that CDK may be using esbuild to bundle things but not sure when this is activated.
There are also plenty of tutorials about using webpack in conjunction with CDK.

We can use docker images:

```js
    // Create an ECR repo:
    // const repo = new ecr.Repository(this, 'hello-docker', {
    //   repositoryName: 'serverless-express-hello',
    // });
    // Use an existing ECR repo:
    const repo = ecr.Repository.fromRepositoryName(
      this,
      'serverless-express-hello',
      'serverless-express-hello',
    );
    new lambda.Function(this, 'HelloDocker', {
      runtime: lambda.Runtime.FROM_IMAGE,
      code: lambda.Code.fromEcrImage(repo),
      handler: Handler.FROM_IMAGE,
    });
```

- Docker and lambda
  - **AWS ECR console** has instructions on how to create and authenticate with ECR
  - <https://gallery.ecr.aws/lambda/nodejs>
    - includes instructions on how to build and start the container and test your handler with curl
    - docker image: public.ecr.aws/lambda/nodejs:latest
  - <https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html>
  - <https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/>
    - BEWARE: slightly out of date instructions regarding where to COPY to

## Appendix: Events and API Gateway

Because we're using express in a lambda, we need to pass things express understands ie http requests.

There are various event types that can hit lambda in AWS, see the "Working with other services" section in the AWS Lambda developer guide:
<https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html>
There are links to all the other services and their events from this page includingi API Gateway which is one way outside http events can hit our lambda: <https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html>.

> AWS Lambda integrates with other AWS services to invoke functions. You can configure triggers to invoke a function in response to resource lifecycle events, respond to incoming HTTP requests, consume events from a queue, or run on a schedule.
>
> Each service that integrates with Lambda sends data to your function in JSON as an event. The structure of the event document is different for each event type, and contains data about the resource or request that triggered the function. Lambda runtimes convert the event into an object and pass it to your function.

It makes sense to target the API Gateway format since we're not mimicking another AWS service.

To make /ping work we need to do the following:

- 1) @vendia needs to see requestContext so it can classify the event as api gateway.
- 2) the "accepts" library assumes there is a "headers" object

We need something like

```js
{
  requestContext: {},
  path: '/ping',
  httpMethod: 'GET',
  headers: {},
}
```

@vendia/serverless-express provides mapping mechanisms to map events to valid express requests.

```js
import serverlessExpress from '@vendia/serverless-express';
import _app from './app';

export const app = serverlessExpress({
  app: _app,
});
```

In the above fragment we can pass additional options to `serverlessExpress`.
Like this:

```js
serverlessExpress({
  app,
  eventSource: {
    getRequest: requestMapper,
    getResponse: responseMapper
  }
})
```

<https://github.com/vendia/serverless-express/blob/671f914429e9708bfb1ee6ba76b5947a917592df/examples/custom-mapper-dynamodb/src/dynamodb-event-mappings.js> shows an example mapping for a dynamo request which would be used as a `requestMapper` (in the above):

```js
function mapDynamoDbEventToHttpRequest ({ event }) {
  const record = event.Records[0]
  const method = getMethodBasedOnRecordEventName({ record })
  const path = getPath({ method, record })

  return {
    method,
    path,
    headers: {}
  }
}
```

## Appendix: Authenticate with ECR

Retrieve an authentication token and authenticate your Docker client to your registry.

Change AWS_PROFILE and account number below.

```sh
ACCOUNT=xxxxxxxxxxxx; \
AWS_PROFILE=demo \
aws ecr get-login-password --region ap-southeast-2 | \
  docker login \
  --username AWS \
  --password-stdin \
  ${ACCOUNT}.dkr.ecr.ap-southeast-2.amazonaws.com
```

Note: If you receive an error using the AWS CLI, make sure that you have the
latest version of the AWS CLI and Docker installed.
