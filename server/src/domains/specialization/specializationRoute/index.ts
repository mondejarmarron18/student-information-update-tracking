import { Router } from "express";
import SpecializationController from "../specializationController";
import authMiddleware from "../../../middlewares/authMiddleware";
import SpecializationMiddleware from "../specializationMiddleware";
import authRole from "../../../middlewares/authRole";

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

specializationRoute.delete(
  "/:specializationId",
  [
    authMiddleware,
    specializationMiddleware.deleteSpecializationById,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  specializationController.deleteSpecializationById
);

specializationRoute.post(
  "/",
  [
    authMiddleware,
    specializationMiddleware.createSpecialization,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  specializationController.createSpecialization
);
specializationRoute.put(
  "/:specializationId",
  [
    authMiddleware,
    specializationMiddleware.updateSpecialization,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  specializationController.updateSpecialization
);

export default specializationRoute;
