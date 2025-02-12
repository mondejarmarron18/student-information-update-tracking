import { schemaName } from "../../../constants/schemaName";
import CustomError from "../../../utils/CustomError";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import { AuditLog } from "../auditLogModel";
import AuditLogRepository from "../auditLogRepository";

export default class AuditLogService {
  private auditLogRepository: AuditLogRepository;

  constructor() {
    this.auditLogRepository = new AuditLogRepository();
  }

  getAuditLogs(userId?: AuditLog["userId"]) {
    return this.auditLogRepository.getAuditLogs(userId);
  }

  getAuditLogById(auditLogId: AuditLog["_id"], userId?: AuditLog["userId"]) {
    return this.auditLogRepository.getAuditLogById(auditLogId, userId);
  }

  createAuditLog(params: Omit<AuditLog, "_id" | "timestamp">) {
    const validEntityName = Object.values(schemaName).includes(params.entity);

    if (!validEntityName) {
      CustomError.badRequest({
        description: "Invalid entity name",
      });
    }

    return this.auditLogRepository.createAuditLog(params);
  }
}
