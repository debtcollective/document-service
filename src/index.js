// @flow

import worker from "./worker";

export const handler = async (event: MessageEvent, context: Context) => {
  let result = null;

  try {
    result = await worker.run(event);
  } catch (error) {
    return context.fail(error);
  }

  return context.succeed({
    body: JSON.stringify({
      result,
    }),
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
  });
};
