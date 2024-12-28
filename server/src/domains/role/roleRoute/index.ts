import { Router } from "express";
import RoleController from "../roleController";
import RoleMiddleware from "../roleMiddleware";

const roleRoute = Router();
const roleMiddleware = new RoleMiddleware();
const roleController = new RoleController();

roleRoute.get("/", roleController.getRoles);
roleRoute.post("/", roleMiddleware.createRole, roleController.createRole);
roleRoute.put("/:id", roleMiddleware.updateRole, roleController.updateRole);
roleRoute.delete("/:id", roleMiddleware.deleteRole, roleController.deleteRole);
roleRoute.get("/:id", roleMiddleware.getRoleById, roleController.getRoleById);

export default roleRoute;
