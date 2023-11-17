import { GraphQLError } from "graphql/error";

export const gqlErrorHandler = (error: GraphQLError) => {
  if ("response" in error.extensions) {
    const { message, ...response } = error.extensions["response"] as {
      message: string;
      response: object;
    };
    return {
      message,
      extensions: {
        timestamp: new Date().toISOString(),
        ...response,
      },
    };
  }
  return error;
};
