export const ANNOUNCEMENT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
export const announcementStatuses = Object.values(ANNOUNCEMENT_STATUS);
export type AnnouncementStatus = keyof typeof ANNOUNCEMENT_STATUS;

export const ANNOUNCEMENT_TYPE = {
  GENERAL: "general",
  IMPORTANT: "important",
  URGENT: "urgent",
  EVENT: "event",
  INFO: "information",
} as const;
export const announcementTypes = Object.values(ANNOUNCEMENT_TYPE);
export type AnnouncementType = keyof typeof ANNOUNCEMENT_TYPE;
