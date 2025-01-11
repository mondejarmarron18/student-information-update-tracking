import { ICustomError } from "../utils/CustomError";

const customErrors: Record<string, ICustomError> = {
  badRequest: {
    status: 400,
    message: "Invalid Request",
    description:
      "The server cannot process the request due to malformed syntax or invalid parameters. Please check the request data.",
  },
  unauthorized: {
    status: 401,
    message: "Login Required",
    description: "You need to log in to access this resource.",
  },
  forbidden: {
    status: 403,
    message: "Access Denied",
    description:
      "You do not have permission to access this resource. Contact support if you think this is an error.",
  },
  notFound: {
    status: 404,
    message: "Resource Not Found",
    description: "We couldn't find the resource you're looking for.",
  },
  alreadyExists: {
    status: 409,
    message: "Conflict",
    description: "A resource with the same identifier already exists.",
  },
  unprocessableEntity: {
    status: 422,
    message: "Something Went Wrong",
    description:
      "The request was valid, but there was an issue processing it. Please check the data and try again.",
  },
  unverifiedAccount: {
    status: 422,
    message: "Account Not Verified",
    description:
      "Your account is unverified. Please check your email and follow the instructions to verify your account.",
  },
  accountLocked: {
    status: 423,
    message: "Account Locked",
    description:
      "Your account has been locked due to multiple failed login attempts or suspicious activity. Please contact support.",
  },
  tooManyRequests: {
    status: 429,
    message: "Too Many Requests",
    description:
      "You've made too many requests in a short time. Please wait a moment and try again later.",
  },
  expiredToken: {
    status: 440,
    message: "Session Expired",
    description: "Your session has expired. Please log in again to continue.",
  },
  internalServerError: {
    status: 500,
    message: "Something Went Wrong",
    description:
      "The server encountered an unexpected issue. Please try again later or contact support if the problem persists.",
  },
  serviceUnavailable: {
    status: 503,
    message: "Service Unavailable",
    description:
      "The server is temporarily unavailable due to maintenance or overload. Please try again later.",
  },
} as const;

export default customErrors;
