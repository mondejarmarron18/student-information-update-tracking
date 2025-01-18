export interface IAuditLog {
  _id: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}
