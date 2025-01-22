import { UserProfile } from "./userProfile.type";

export interface Course {
  _id: string;
  name: string;
  description: string;
  details: string;
  creatorId: string;
  updaterId: string;
  creator: UserProfile;
  updater: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
