import { Router } from "express";
import AuditLogController from "../auditLogController";
import authMiddleware from "../../../middlewares/authMiddleware";

const auditLogRoute = Router();
const auditLogController = new AuditLogController();

auditLogRoute.get("/", [authMiddleware], auditLogController.getAuditLogs);
auditLogRoute.get("/download", auditLogController.downloadAuditLogs);

export default auditLogRoute;
