export interface IAuditLog {
  _id: string;
  entity: string;
  timestamp: Date;
  requestedFilter: Record<string, unknown>;
  requestedUrl: string;
  ipAddress: string;
  userAgent: string;
  userId?: string;
  action: string;
  details: string;
  userEmail: string;
}
