import { Response } from "express";
import { ICustomError } from "./CustomError";

export interface ICustomReponse {
  status: number;
  message: string;
  data: unknown;
}

export default class CustomResponse {
  static sendSuccess = (res: Response, data: ICustomReponse) => {
    res.status(data.status).send(data);
  };

  static sendError = (res: Response, error: ICustomError) => {
    res.status(500).send(error);
  };
}
