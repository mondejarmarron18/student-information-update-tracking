import { schemaName } from "../../../constants/schemaName";
import AuditLogModel, { AuditLog } from "../auditLogModel";
import { userAccount } from "./auditLogPipelines";

export default class AuditLogRepository {
  private auditLogModel: typeof AuditLogModel;

  constructor() {
    this.auditLogModel = AuditLogModel;
  }

  getAuditLogs = async () => {
    return this.auditLogModel.aggregate([
      ...userAccount,
      {
        $addFields: {
          userEmail: "$user.email",
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
    ]);
  };

  getAuditLogById = async (id: AuditLog["_id"]) => {
    const auditLogs = await this.auditLogModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      ...userAccount,
      {
        $addFields: {
          userEmail: "$user.email",
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    return auditLogs.length > 0 ? auditLogs[0] : null;
  };

  createAuditLog = async (params: Omit<AuditLog, "_id" | "timestamp">) => {
    return this.auditLogModel.create(params);
  };
}
