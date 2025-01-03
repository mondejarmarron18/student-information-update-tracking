import { Response } from "express";
import CustomError from "./CustomError";
import CustomResponse from "./CustomResponse";
import customErrors from "../constants/customErrors";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

const ErrorResponse = (res: Response, error: unknown) => {
  if (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return CustomResponse.sendError(res, error);
    }

    if (error instanceof Error || error instanceof MongooseError) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.message,
      });
    }

    if (error instanceof ZodError) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.issues.map((issue) => issue.message),
      });
    }

    return CustomResponse.sendError(res, {
      ...customErrors.internalServerError,
      details: error,
    });
  }
};

export default ErrorResponse;
