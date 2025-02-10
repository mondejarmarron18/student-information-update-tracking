import { Router } from "express";
import AuditLogController from "../auditLogController";
import authMiddleware from "../../../middlewares/authMiddleware";
import authRole from "../../../middlewares/authRole";
import AuditLogMiddleware from "../auditLogMiddleware";

const auditLogRoute = Router();
const auditLogController = new AuditLogController();
const auditLogMiddleware = new AuditLogMiddleware();

auditLogRoute.get(
  "/",
  [authMiddleware, authRole().isSuperAdmin().isAdmin().apply],
  auditLogController.getAuditLogs
);
auditLogRoute.get(
  "/:auditLogId",
  [
    authMiddleware,
    auditLogMiddleware.getAuditLogById,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  auditLogController.getAuditLogById
);
auditLogRoute.get(
  "/download",
  [authMiddleware, authRole().isSuperAdmin().isAdmin().apply],
  auditLogController.downloadAuditLogs
);

export default auditLogRoute;
