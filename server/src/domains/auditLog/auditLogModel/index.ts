import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export type AuditLog = {
  _id: Types.ObjectId;
  entityName: (typeof schemaName)[keyof typeof schemaName];
  entityId: Types.ObjectId;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  userId: Types.ObjectId;
  action: string;
  details: string;
};

const auditLogSchema = new Schema<AuditLog>({
  entityName: {
    type: String,
    enum: schemaName,
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId, //Optional for multiple entity ids
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: schemaName.USER,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const AuditLogModel = model<AuditLog>(
  schemaName.AUDIT_LOG,
  auditLogSchema,
  schemaName.AUDIT_LOG
);

export default AuditLogModel;
