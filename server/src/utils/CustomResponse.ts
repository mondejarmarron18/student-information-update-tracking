import { Response } from "express";
import { ICustomError } from "./CustomError";

interface IReponseSuccess {
  status?: number;
  accessToken?: string;
  message: string;
  data: unknown | null;
}

type IFunc<T> = (res: Response, response: T) => void;

export default class CustomResponse {
  static sendSuccess: IFunc<IReponseSuccess> = (res, data) => {
    const status = data?.status || 200;

    res.status(status).send({
      ...data,
      status,
    });
  };

  static sendError: IFunc<ICustomError> = (res, error) => {
    const { message, status, description, details } = error;

    res.status(status).send({
      message,
      status,
      description,
      details,
    });
  };
}
