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

  getAuditLogs() {
    return this.auditLogRepository.getAuditLogs();
  }

  getAuditLogById(auditLogId: AuditLog["_id"]) {
    return this.auditLogRepository.getAuditLogById(auditLogId);
  }

  createAuditLog(params: Omit<AuditLog, "_id" | "timestamp">) {
    const validEntityName = Object.values(schemaName).includes(
      params.entityName
    );

    if (!validEntityName) {
      CustomError.badRequest({
        description: "Invalid entity name",
      });
    }

    return this.auditLogRepository.createAuditLog(params);
  }
}
