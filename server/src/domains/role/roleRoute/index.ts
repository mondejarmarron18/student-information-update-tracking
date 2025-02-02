import { Router } from "express";
import RoleController from "../roleController";
import RoleMiddleware from "../roleMiddleware";
import authMiddleware from "../../../middlewares/authMiddleware";
import authRole from "../../../middlewares/authRole";

const roleRoute = Router();
const roleMiddleware = new RoleMiddleware();
const roleController = new RoleController();

roleRoute.get(
  "/",
  [authMiddleware, authRole().isAdmin().isSuperAdmin().apply],
  roleController.getRoles
);
roleRoute.post(
  "/",
  [
    authMiddleware,
    authRole().isAdmin().isSuperAdmin().apply,
    roleMiddleware.createRole,
  ],
  roleController.createRole
);
roleRoute.put(
  "/:id",
  [authMiddleware, authRole().isAdmin().isSuperAdmin().apply],
  roleMiddleware.updateRole,
  roleController.updateRole
);
roleRoute.delete(
  "/:id",
  [authMiddleware, authRole().isAdmin().isSuperAdmin().apply],
  roleMiddleware.deleteRole,
  roleController.deleteRole
);
roleRoute.get(
  "/:id",
  [authMiddleware, authRole().isAdmin().isSuperAdmin().apply],
  roleMiddleware.getRoleById,
  roleController.getRoleById
);

export default roleRoute;
