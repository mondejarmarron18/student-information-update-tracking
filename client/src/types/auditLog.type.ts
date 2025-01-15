export interface IAuditLog {
  ipAddress: string;
  userAgent: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}
