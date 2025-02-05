import { AnnouncementStatus, AnnouncementType } from "@/constants/announcement";

export type Announcement = {
  _id: string;
  publisherId: string;
  publisherProfile?: string;
  title: string;
  type: AnnouncementType;
  description: string;
  details?: string;
  status: AnnouncementStatus;
  createdAt: Date;
  updatedAt: Date;
};
