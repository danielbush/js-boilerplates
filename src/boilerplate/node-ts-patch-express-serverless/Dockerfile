# See https://gallery.ecr.aws/lambda/nodejs
FROM public.ecr.aws/lambda/nodejs:latest

COPY handler.js ${LAMBDA_TASK_ROOT}/

CMD [ "handler.hello" ]
