import customErrors from "../constants/customErrors";

export interface ICustomError {
  status: number;
  message: string;
  description: string;
  details?: unknown;
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
      ...customErrors.badRequest,
      ...error,
    });
  };

  static unauthorized: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.unauthorized,
      ...error,
    });
  };

  static forbidden: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.forbidden,
      ...error,
    });
  };

  static notFound: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.notFound,
      ...error,
    });
  };

  static alreadyExists: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.alreadyExists,
      ...error,
    });
  };

  static unprocessableEntity: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.unprocessableEntity,
      ...error,
    });
  };

  static unverifiedAccount: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.unverifiedAccount,
      ...error,
    });
  };

  static accountLocked: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.accountLocked,
      ...error,
    });
  };

  static tooManyRequests: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.tooManyRequests,
      ...error,
    });
  };

  static expiredToken: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.expiredToken,
      ...error,
    });
  };

  static internalServerError: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.internalServerError,
      ...error,
    });
  };

  static serviceUnavailable: ICustomErrorFunction = (error) => {
    throw new CustomError({
      ...customErrors.serviceUnavailable,
      ...error,
    });
  };
}
