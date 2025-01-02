import { x8tAsync } from "x8t";
import { IUser } from "../userModel";
import UserService from "../userService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import CustomError from "../../../utils/CustomError";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(
      this.userService.createUser(req.body)
    );

    if (error !== null || !result) {
      console.error("Error creating user:", error);

      if (error instanceof MongooseError || error instanceof Error) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(204).send();
  };

  getUsers = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(this.userService.getUsers());

    if (error !== null) {
      console.error("Error getting users:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(200).send({ data: result });
  };

  loginUser = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(
      this.userService.loginUser(req.body)
    );

    if (error) {
      if (error instanceof CustomError) {
        console.log("Error logging in user:", error);
        return CustomResponse.sendError(res, error);
      }

      if (error instanceof Error || error instanceof MongooseError) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    if (!result?.token || !result?.refreshToken) {
      return CustomResponse.sendError(res, {
        ...customErrors.internalServerError,
        details: "Failed to generate tokens",
      });
    }

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send(result.token);
  };

  verifyUser = async (req: Request, res: Response) => {
    const verificationCode = convertToObjectId(req.params.verificationCode);

    if (verificationCode.error || !verificationCode.id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: verificationCode.error || "Invalid verification code",
      });
    }

    const user = await x8tAsync(
      this.userService.verifyUser(verificationCode.id)
    );

    if (user.error) {
      console.error("Error verifying user:", user.error);

      if (user.error instanceof CustomError) {
        return CustomResponse.sendError(res, user.error);
      }

      if (user.error instanceof Error || user.error instanceof MongooseError) {
        return CustomResponse.sendError(res, {
          ...customErrors.badRequest,
          details: user.error.message,
        });
      }

      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    res.status(204).send();
  };
}
