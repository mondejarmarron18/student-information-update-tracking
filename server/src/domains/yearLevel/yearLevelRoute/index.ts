import { Router } from "express";
import YearLevelController from "../yearLevelController";
import authMiddleware from "../../../middlewares/authMiddleware";
import YearLevelMiddleware from "../yearLevelMiddleware";

const yearLevelRoute = Router();
const yearLevelController = new YearLevelController();
const yearLevelMiddleware = new YearLevelMiddleware();

yearLevelRoute.get("/", [authMiddleware], yearLevelController.getYearLevels);
yearLevelRoute.post(
  "/",
  [authMiddleware, yearLevelMiddleware.createYearLevel],
  yearLevelController.createYearLevel
);

export default yearLevelRoute;
