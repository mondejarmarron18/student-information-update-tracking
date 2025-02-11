import { Router } from "express";
import YearLevelController from "../yearLevelController";
import authMiddleware from "../../../middlewares/authMiddleware";
import YearLevelMiddleware from "../yearLevelMiddleware";
import authRole from "../../../middlewares/authRole";

const yearLevelRoute = Router();
const yearLevelController = new YearLevelController();
const yearLevelMiddleware = new YearLevelMiddleware();

yearLevelRoute.post(
  "/",
  [
    authMiddleware,
    yearLevelMiddleware.createYearLevel,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  yearLevelController.createYearLevel
);
yearLevelRoute.get("/", [authMiddleware], yearLevelController.getYearLevels);
yearLevelRoute.get(
  "/:yearLevelId",
  [authMiddleware, yearLevelMiddleware.getYearLevelById],
  yearLevelController.getYearLevelById
);
yearLevelRoute.delete(
  "/:yearLevelId",
  [
    authMiddleware,
    yearLevelMiddleware.deleteYearLevelById,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  yearLevelController.deleteYearLevelById
);
yearLevelRoute.put(
  "/:yearLevelId",
  [
    authMiddleware,
    yearLevelMiddleware.getYearLevelById,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  yearLevelController.updateYearLevel
);

export default yearLevelRoute;
