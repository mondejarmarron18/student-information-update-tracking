import { NextFunction, Request, Response } from "express";

export type IMiddleware = (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => void;
