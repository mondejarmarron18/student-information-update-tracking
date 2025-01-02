import { ICustomError } from "../utils/CustomError";

const customErrors: Record<string, ICustomError> = {
  badRequest: {
    status: 400,
    message: "Bad Request",
    description:
      "The server cannot process the request due to malformed syntax or invalid parameters. Please check the request data.",
  },
  unauthorized: {
    status: 401,
    message: "Unauthorized",
    description: "You are not authorized to perform this action.",
  },
  forbidden: {
    status: 403,
    message: "Forbidden",
    description:
      "Access to this resource is forbidden. You may not have the required permissions or the resource may be restricted from you.",
  },
  notFound: {
    status: 404,
    message: "Not Found",
    description: "The requested resource could not be found on the server.",
  },
  alreadyExists: {
    status: 409,
    message: "Conflict",
    description: "A resource with the same identifier already exists.",
  },
  unprocessableEntity: {
    status: 422,
    message: "Unprocessable Entity",
    description:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  unverifiedAccount: {
    status: 422,
    message: "Unverified Account",
    description:
      "Your account is unverified. Please check your email and verify your account.",
  },
  accountLocked: {
    status: 423,
    message: "Account Locked",
    description:
      "The account has been locked due to multiple failed login attempts or suspicious activity.",
  },
  tooManyRequests: {
    status: 429,
    message: "Too Many Requests",
    description:
      "You have made too many requests in a short amount of time. Please try again later after waiting for the rate limit to reset.",
  },
  expiredToken: {
    status: 440,
    message: "Expired Token",
    description: "The provided token has expired.",
  },
  internalServerError: {
    status: 500,
    message: "Internal Server Error",
    description:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
  },
  serviceUnavailable: {
    status: 503,
    message: "Service Unavailable",
    description:
      "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance.",
  },
} as const;

export default customErrors;
