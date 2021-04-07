#!/bin/sh
set -e

test -n "$IMAGE"
test -n "$AWS_REGION"
test -n "$AWS_PROFILE"
test -n "$ACCOUNT"
NAME=test
ECR_TAG=$ACCOUNT.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE:latest

if ! aws ecr describe-repositories | grep repositoryArn | grep $IMAGE; then
  echo
  echo
  echo "Creating ECR: $ECR_TAG"
  echo
  # Create ecr repo
  aws ecr create-repository \
    --repository-name $IMAGE \
    --region ap-southeast-2
fi

echo
echo
echo "Building: $IMAGE"
echo
docker rm -f $NAME 2>/dev/null || true
docker build -t $IMAGE .

echo
echo
echo "Testing image..."
echo
set -x
docker run --rm --name $NAME -p 9000:8080 $IMAGE &
sleep 3
set +x
if curl \
  -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
  -d '{ "payload": 123 }' | grep 'hello boilerplate'; then
  echo
  echo "OK - saw 'hello boilerlpate'"
else
  echo
  echo "FAILED - didn't see 'hello boilerlpate'"
fi
docker rm -f $NAME 2>/dev/null || true

echo
echo
echo "Push to ECR: $ECR_TAG"
echo
docker tag $IMAGE:latest $ECR_TAG
docker push $ECR_TAG

echo "Now you need to create a docker-based lambda that uses $IMAGE"
