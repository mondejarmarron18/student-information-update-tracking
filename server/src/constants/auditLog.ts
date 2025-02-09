export const auditLogAction = {
  CREATED: "created",
  UPDATED: "updated",
  DELETED: "deleted",
  DELETED_PERMANENTLY: "deleted permanently",
  APPROVED: "approved",
  REJECTED: "rejected",
  VIEWED: "viewed",
  VERIFIED: "verified",
  REGISTERED: "registered",
  DOWNLOADED: "downloaded",
  EXPORTED: "exported",
  ARCHIVED: "archived",
  RESTORED: "restored",
  SUBMITTED: "submitted",
  LOGGED_IN: "logged in",
  LOGGED_OUT: "logged out",
  REQUESTED: "requested",
} as const;
