import { schemaName } from "../../../constants/schemaName";
import AuditLogModel, { AuditLog } from "../auditLogModel";

export default class AuditLogRepository {
  private auditLogModel: typeof AuditLogModel;

  constructor() {
    this.auditLogModel = AuditLogModel;
  }

  getAuditLogs = async () => {
    return this.auditLogModel.aggregate([
      {
        $lookup: {
          from: schemaName.USER,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
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
