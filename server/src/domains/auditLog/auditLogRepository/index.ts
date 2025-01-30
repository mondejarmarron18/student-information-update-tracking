import { schemaName } from "../../../constants/schemaName";
import AuditLogModel, { AuditLog } from "../auditLogModel";

export default class AuditLogRepository {
  private auditLogModel: typeof AuditLogModel;

  constructor() {
    this.auditLogModel = AuditLogModel;
  }

  getAuditLogs = async () => {
    return this.auditLogModel.aggregate([]);
  };

  getAuditLogById = async (id: AuditLog["_id"]) => {
    return this.auditLogModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
    ]);
  };

  createAuditLog = async (params: Omit<AuditLog, "_id" | "timestamp">) => {
    return this.auditLogModel.create(params);
  };
}
