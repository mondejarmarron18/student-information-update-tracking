import { Router } from "express";
import SpecializationController from "../specializationController";
import authMiddleware from "../../../middlewares/authMiddleware";
import SpecializationMiddleware from "../specializationMiddleware";

const specializationRoute = Router();
const specializationController = new SpecializationController();
const specializationMiddleware = new SpecializationMiddleware();

specializationRoute.get(
  "/",
  [authMiddleware],
  specializationController.getSpecializations
);
specializationRoute.get(
  "/:courseId",
  [authMiddleware, specializationMiddleware.getSpecializationsByCourseId],
  specializationController.getSpecializationsByCourseId
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
