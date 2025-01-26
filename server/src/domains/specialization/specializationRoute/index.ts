import { Router } from "express";
import SpecializationController from "../specializationController";
import authMiddleware from "../../../middlewares/authMiddleware";
import SpecializationMiddleware from "../specializationMiddleware";

const specializationRoute = Router();
const specializationController = new SpecializationController();
const specializationMiddleware = new SpecializationMiddleware();

specializationRoute.get(
  "/",
  [authMiddleware, specializationMiddleware.getSpecializations],
  specializationController.getSpecializations
);
specializationRoute.get(
  "/:specializationId",
  [authMiddleware, specializationMiddleware.getSpecializationById],
  specializationController.getSpecializationById
);
specializationRoute.post(
  "/",
  [authMiddleware, specializationMiddleware.createSpecialization],
  specializationController.createSpecialization
);
specializationRoute.put(
  "/:specializationId",
  [authMiddleware, specializationMiddleware.updateSpecialization],
  specializationController.updateSpecialization
);

export default specializationRoute;
