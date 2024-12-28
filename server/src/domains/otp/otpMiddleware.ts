import { NextFunction, Request, Response } from "express";
import { x8tSync } from "x8t";
import { z } from "zod";

export default class OtpMiddleware {
  generateOtp = (req: Request, res: Response, next: NextFunction) => {
    const validate = z.object({
      email: z.string().email(),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  verifyOtp = (req: Request, res: Response, next: NextFunction) => {
    const validate = z.object({
      otp: z.number(),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };
}
