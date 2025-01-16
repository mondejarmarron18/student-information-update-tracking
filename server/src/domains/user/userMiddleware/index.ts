import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { validatePassword } from "./validationSchema";
import { IMiddlware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class UserMiddleware {
  createUser: IMiddlware = (req, res, next) => {
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

  loginUser: IMiddlware = (req, res, next) => {
    const validate = z.object({
      email: z.string().email().nonempty("Email is required"),
      password: z.string().nonempty("Password is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  verifyUser: IMiddlware = (req, res, next) => {
    const validate = z.object({
      verificationCode: z.string().nonempty("Verification code is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  updatePassword: IMiddlware = (req, res, next) => {
    const validate = z.object({
      currentPassword: z.string().nonempty("Current password is required"),
      newPassword: validatePassword,
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  sendPasswordResetEmail: IMiddlware = (req, res, next) => {
    const validate = z.object({
      email: z.string().email().nonempty("Email is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  resetPassword: IMiddlware = (req, res, next) => {
    const validate = z.object({
      password: validatePassword,
      verificationCode: z.string().nonempty("Verification code is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };
}
