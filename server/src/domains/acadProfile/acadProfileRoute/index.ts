import { Router } from "express";
import AcadProfileController from "../acadProfileController";
import authMiddleware from "../../../middlewares/authMiddleware";

const acadProfileRoute = Router();
const acadProfileController = new AcadProfileController();

acadProfileRoute.get("/", acadProfileController.getAcadProfiles);
acadProfileRoute.post(
  "/",
  [authMiddleware],
  acadProfileController.createAcadProfile
);
acadProfileRoute.get(
  "/me",
  [authMiddleware],
  acadProfileController.getOwnAcadProfile
);

export default acadProfileRoute;
