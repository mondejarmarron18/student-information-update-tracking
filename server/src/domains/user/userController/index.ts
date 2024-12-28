import { x8tAsync } from "x8t";
import { IUser } from "../userModel";
import UserService from "../userService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(
      this.userService.createUser(req.body)
    );

    if (error !== null) {
      console.error("Error creating user:", error);

      if (error instanceof MongooseError || error instanceof Error) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ data: result });
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
    const { result, error } = await x8tAsync(
      this.userService.verifyUser(req.params.verificationToken)
    );

    if (error !== null) {
      console.error("Error verifying user:", error);

      if (error instanceof Error || error instanceof MongooseError) {
        res.status(400).send({ error: error.message });
        return;
      }

      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(200).send(result);
  };
}
