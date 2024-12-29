import { x8tAsync } from "x8t";
import { IUser } from "../userModel";
import UserService from "../userService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { convertToObjectId } from "../../../utils/mongooseUtil";

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

    if (error !== null) {
      console.error("Error logging in user:", error);

      if (error instanceof Error || error instanceof MongooseError) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(200).send(result);
  };

  verifyUser = async (req: Request, res: Response) => {
    const verificationCode = convertToObjectId(req.params.verificationCode);

    if (verificationCode.error) {
      res.status(400).send({ error: verificationCode.error });
      return;
    }

    if (!verificationCode.id) {
      res.status(400).send({ error: "Invalid verification code" });
      return;
    }

    const user = await x8tAsync(
      this.userService.verifyUser(verificationCode.id)
    );

    if (user.error) {
      console.error("Error verifying user:", user.error);

      if (user.error instanceof Error || user.error instanceof MongooseError) {
        res.status(400).send({ error: user.error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(204).send();
  };
}
