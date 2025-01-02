import { Router } from "express";
import UserProfileController from "../userProfileController";
import UserProfileMiddleware from "../userProfileMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";

const userProfileRoute = Router();
const userProfileController = new UserProfileController();

userProfileRoute.get("/", userProfileController.getUserProfiles);
userProfileRoute.post(
  "/",
  [authMiddleware, UserProfileMiddleware.createUserProfile],
  userProfileController.createUserProfile
);

export default userProfileRoute;
