export interface ICustomError {
  status: number;
  message: string;
  description: string;
  details: unknown;
}

export interface ICustomErrorFunction {
  (error?: Partial<Omit<ICustomError, "status" | "message">>): void;
}

export default class CustomError extends Error {
  status: ICustomError["status"];
  description: ICustomError["description"];
  details: ICustomError["details"];

  constructor(error: ICustomError) {
    super(error.message);
    this.name = this.constructor.name;
    this.status = error.status;
    this.message = error.message;
    this.description = error.description;
    this.details = error.details;
  }

  static badRequest: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 400,
      message: "Bad Request",
      description:
        error?.description ||
        "The server cannot process the request due to malformed syntax or invalid parameters. Please check the request data.",
      details: error?.details,
    });
  };

  static unauthorized: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 401,
      message: "Unauthorized",
      description:
        error?.description || "You are not authorized to perform this action.",
      details: error?.details,
    });
  };

  static forbidden: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 403,
      message: "Forbidden",
      description:
        error?.description ||
        "Access to this resource is forbidden. You may not have the required permissions or the resource may be restricted from you.",
      details: error?.details,
    });
  };

  static notFound: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 404,
      message: "Not Found",
      description:
        error?.description ||
        "The requested resource could not be found on the server.",
      details: error?.details,
    });
  };

  static alreadyExists: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 409,
      message: "Conflict",
      description:
        error?.description ||
        "A resource with the same identifier already exists.",
      details: error?.details,
    });
  };

  static unprocessableEntity: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 422,
      message: "Unprocessable Entity",
      description:
        error?.description ||
        "The request was well-formed but was unable to be followed due to semantic errors.",
      details: error?.details,
    });
  };

  static accountLocked: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 423,
      message: "Account Locked",
      description:
        error?.description ||
        "The account has been locked due to multiple failed login attempts or suspicious activity.",
      details: error?.details,
    });
  };

  static tooManyRequests: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 429,
      message: "Too Many Requests",
      description:
        error?.description ||
        "You have made too many requests in a short amount of time. Please try again later after waiting for the rate limit to reset.",
      details: error?.details,
    });
  };

  static expiredToken: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 440,
      message: "Expired Token",
      description: error?.description || "The provided token has expired.",
      details: error?.details,
    });
  };

  static internalServerError: ICustomErrorFunction = (error) => {
    throw new CustomError({
      status: 500,
      message: "Internal Server Error",
      description:
        error?.description ||
        "The server encountered an unexpected condition that prevented it from fulfilling the request.",
      details: error?.details,
    });
  };
}
