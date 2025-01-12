import { Router } from "express";
import UserController from "../userController";
import UserMiddleware from "../userMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";
import authReCaptcha from "../../../middlewares/authCaptcha";

const userRoute = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

//Get all users
userRoute.get("/", [authMiddleware], userController.getUsers);
//Create user
userRoute.post(
  "/",
  [authMiddleware, userMiddleware.createUser],
  userController.registerUser
);
//Register as a student
userRoute.post(
  "/register",
  [authReCaptcha, userMiddleware.createUser],
  userController.registerUser
);
//Login
userRoute.post("/login", userMiddleware.loginUser, userController.loginUser);
//Logout
userRoute.post("/logout", [authMiddleware], userController.logoutUser);
//Verify email
userRoute.get(
  "/verify-email/:verificationCode",
  userMiddleware.verifyUser,
  userController.verifyUser
);
//Get own user details
userRoute.get("/me", [authMiddleware], userController.getOwnUser);
userRoute.head("/auth", [authMiddleware], userController.isAuthenticated);

export default userRoute;
