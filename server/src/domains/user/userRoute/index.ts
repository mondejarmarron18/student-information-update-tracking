import { Response, Router } from "express";
import UserController from "../userController";
import UserMiddleware from "../userMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";
import authReCaptcha from "../../../middlewares/authCaptcha";
import authRole from "../../../middlewares/authRole";
import authIpAddress from "../../../middlewares/authIpAddress";
import cacheMiddleware from "../../../middlewares/cacheMiddleware";
import apiLimiter from "../../../middlewares/apiLimiter";

const userRoute = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

//Get all users
userRoute.get(
  "/",
  [
    authMiddleware,
    authRole().isAdmin().isStaff().apply,
    userMiddleware.getUsers,
  ],
  userController.getUsers
);
userRoute.get(
  "/:userId",
  [authMiddleware, authRole().isAdmin().isStaff().apply],
  userController.getUserById
);
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
  "/email-verification/:verificationCode",
  userMiddleware.verifyUser,
  userController.verifyUser
);
//Get own user details
userRoute.get("/me", [authMiddleware], userController.getOwnUser);
userRoute.head("/auth", [authMiddleware], userController.isAuthenticated);
//Update own user details
userRoute.patch(
  "/me/password",
  [authMiddleware, userMiddleware.updatePassword],
  userController.updateOwnPassword
);
userRoute.post(
  "/forgot-password",
  [userMiddleware.sendPasswordResetEmail, apiLimiter(5, 3600 * 1000)],
  userController.sendPasswordResetEmail
);
userRoute.patch(
  "/reset-password",
  [userMiddleware.resetPassword],
  userController.resetPassword
);

export default userRoute;
