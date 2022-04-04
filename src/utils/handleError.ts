import * as Sentry from "@sentry/node";
export const errorHandler = (err: Error): void => {
  Sentry.captureException(err);
};
