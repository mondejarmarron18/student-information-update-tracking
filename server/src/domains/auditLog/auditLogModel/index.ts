import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export type AuditLog = {
  _id: Types.ObjectId;
  entity: (typeof schemaName)[keyof typeof schemaName];
  timestamp: Date;
  requestedFilter: Record<string, unknown>;
  requestedUrl: string;
  ipAddress: string;
  userAgent: string;
  userId?: Types.ObjectId;
  action: string;
  details: string;
};

const auditLogSchema = new Schema<AuditLog>({
  entity: {
    type: String,
    enum: schemaName,
    required: true,
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
  requestedUrl: {
    type: String,
    required: true,
  },
  requestedFilter: {
    type: Object,
    required: true,
    default: {},
  },
});

const AuditLogModel = model<AuditLog>(
  schemaName.AUDIT_LOG,
  auditLogSchema,
  schemaName.AUDIT_LOG
);

export default AuditLogModel;
