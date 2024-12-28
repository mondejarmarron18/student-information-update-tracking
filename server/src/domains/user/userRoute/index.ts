import { Router } from "express";
import UserController from "../userController";
import UserMiddleware from "../userMiddleware";

const userRoute = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

userRoute.get("/", userController.getUsers);
userRoute.post("/", userMiddleware.createUser, userController.createUser);
userRoute.post("/token", userMiddleware.loginUser, userController.loginUser);
userRoute.get(
  "/verify-email/:verificationToken",
  userMiddleware.verifyUser,
  userController.verifyUser
);

export default userRoute;
