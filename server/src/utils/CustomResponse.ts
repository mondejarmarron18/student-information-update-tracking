import { Response } from "express";
import CustomError, { ICustomError } from "./CustomError";
import { MongooseError } from "mongoose";
import customErrors from "../constants/customErrors";
import { ZodError } from "zod";

interface IReponseSuccess {
  status?: number;
  accessToken?: string;
  message: string;
  data: unknown | null;
}

export default class CustomResponse {
  static sendSuccess = (res: Response, data: IReponseSuccess) => {
    const status = data?.status || 200;

    res.status(status).send({
      ...data,
      status,
    });
  };

  static sendError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      const { status, message, description, details } = error;

      res.status(status).send({
        status,
        message,
        description,
        details,
      });
      return;
    }

    if (error instanceof Error || error instanceof MongooseError) {
      res.status(400).send({
        ...customErrors.badRequest,
        details: error.message,
      });
      return;
    }

    if (error instanceof ZodError) {
      res.status(400).send({
        ...customErrors.badRequest,
        details: error.issues.map((issue) => issue.message),
      });
      return;
    }

    res.status(500).send({
      ...customErrors.internalServerError,
      details: error,
    });
  };
}
