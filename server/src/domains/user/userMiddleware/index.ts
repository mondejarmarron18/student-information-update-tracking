import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { validatePassword } from "./validationSchema";

export default class UserMiddleware {
  createUser = (req: Request, res: Response, next: NextFunction) => {
    const isLoggedIn = req.user;

    const validate = z.object({
      email: z.string().email().nonempty("Email is required"),
      password: validatePassword,
      roleId: !isLoggedIn
        ? z.undefined()
        : z.string().nonempty("Role ID is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  loginUser = (req: Request, res: Response, next: NextFunction) => {
    const validate = z.object({
      email: z.string().email().nonempty("Email is required"),
      password: z.string().nonempty("Password is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const validate = z.object({
      verificationCode: z.string().nonempty("Verification code is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };
}
