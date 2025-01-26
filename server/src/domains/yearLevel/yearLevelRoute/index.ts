import { Router } from "express";
import YearLevelController from "../yearLevelController";
import authMiddleware from "../../../middlewares/authMiddleware";
import YearLevelMiddleware from "../yearLevelMiddleware";

const yearLevelRoute = Router();
const yearLevelController = new YearLevelController();
const yearLevelMiddleware = new YearLevelMiddleware();

yearLevelRoute.post(
  "/",
  [authMiddleware, yearLevelMiddleware.createYearLevel],
  yearLevelController.createYearLevel
);
yearLevelRoute.get("/", [authMiddleware], yearLevelController.getYearLevels);
yearLevelRoute.get(
  "/:yearLevelId",
  [authMiddleware, yearLevelMiddleware.getYearLevelById],
  yearLevelController.getYearLevelById
);
yearLevelRoute.put(
  "/:yearLevelId",
  [authMiddleware, yearLevelMiddleware.getYearLevelById],
  yearLevelController.updateYearLevel
);

export default yearLevelRoute;
