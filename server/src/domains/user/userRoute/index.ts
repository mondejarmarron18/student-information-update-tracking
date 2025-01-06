import { Router } from "express";
import UserController from "../userController";
import UserMiddleware from "../userMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";

const userRoute = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

userRoute.get("/", [authMiddleware], userController.getUsers);
userRoute.post("/", userMiddleware.createUser, userController.createUser);
userRoute.post("/login", userMiddleware.loginUser, userController.loginUser);
userRoute.post("/logout", [authMiddleware], userController.logoutUser);
userRoute.get(
  "/verify-email/:verificationCode",
  userMiddleware.verifyUser,
  userController.verifyUser
);

export default userRoute;
