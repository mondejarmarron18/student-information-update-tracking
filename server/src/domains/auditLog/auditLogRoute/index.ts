import { Router } from "express";
import AuditLogController from "../auditLogController";
import authMiddleware from "../../../middlewares/authMiddleware";
import authRole from "../../../middlewares/authRole";
import AuditLogMiddleware from "../auditLogMiddleware";

const auditLogRoute = Router();
const auditLogController = new AuditLogController();
const auditLogMiddleware = new AuditLogMiddleware();

auditLogRoute.get("/", [authMiddleware], auditLogController.getAuditLogs);
auditLogRoute.get(
  "/download",
  [authMiddleware],
  auditLogController.downloadAuditLogs
);
auditLogRoute.get(
  "/:auditLogId",
  [authMiddleware, auditLogMiddleware.getAuditLogById],
  auditLogController.getAuditLogById
);

export default auditLogRoute;
