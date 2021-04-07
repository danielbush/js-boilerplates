// Simple handler we can COPY into a docker image and push up to ECR.
// We can then create an image-based lambda function.
// IMPORTANT: use async or remember to use `callback` (the 3rd param) otherwise the lambda will return null.

exports.hello = async (
  /** @type {any} */ event,
  /** @type {any} */ context,
  /** @type {any} */ callback,
) => {
  const payload = { message: 'hello boilerplate', event, context };
  const body = JSON.stringify(payload);
  const response = {
    statusCode: 200,
    headers: {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'application/json',
    },
    body,
  };
  return response;
};
