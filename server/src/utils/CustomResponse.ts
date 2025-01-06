import { response, Response } from "express";
import CustomError, { ICustomError } from "./CustomError";
import { MongooseError } from "mongoose";
import customErrors from "../constants/customErrors";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

interface IReponseSuccess {
  status?: number;
  message: string;
  data?: unknown;
}

export default class CustomResponse {
  static sendSuccess = (res: Response, reponse?: IReponseSuccess) => {
    if (!response) {
      res.status(204).send();
      return;
    }

    const finalResponse: Required<IReponseSuccess> & { accessToken?: string } =
      {
        status: reponse?.status || 200,
        message: reponse?.message || "Success",
        data: reponse?.data || null,
      };

    const accessToken = res.locals.accessToken;

    if (accessToken) {
      finalResponse.accessToken = accessToken;
    }

    res.status(finalResponse.status).send(finalResponse);
  };

  static sendError = (res: Response, error: ICustomError) => {
    const { status, message, description, details } = error;

    res.status(error.status).send({
      status,
      message,
      description,
      details,
    });
  };

  static sendHandledError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return CustomResponse.sendError(res, error);
    }

    if (error instanceof Error) {
      return CustomResponse.sendError(res, {
        ...customErrors.internalServerError,
        details: error.message,
      });
    }

    if (error instanceof MongooseError) {
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

    if (error instanceof JsonWebTokenError) {
      return CustomResponse.sendError(res, {
        ...customErrors.unauthorized,
        details: error.message,
      });
    }

    CustomResponse.sendError(res, {
      ...customErrors.internalServerError,
      details: error,
    });
  };
}
