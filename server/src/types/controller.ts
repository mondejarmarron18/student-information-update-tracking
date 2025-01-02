import { Request, Response } from "express";

export type IControllerFunction = (
  req: Request,
  res: Response
) => Promise<void>;
