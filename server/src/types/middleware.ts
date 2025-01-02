import { NextFunction, Request, Response } from "express";

export type IMiddlware = (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => void;
