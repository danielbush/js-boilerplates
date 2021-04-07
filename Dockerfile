# See https://gallery.ecr.aws/lambda/nodejs
FROM public.ecr.aws/lambda/nodejs:latest

ADD . ${LAMBDA_TASK_ROOT}/
RUN npm i && npm run build

CMD [ "build/src/lambda.app" ]

