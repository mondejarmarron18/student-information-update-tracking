import { UserProfile } from "./userProfile.type";

export interface YearLevel {
  _id: string;
  name: string;
  description?: string;
  creatorId: string;
  updaterId: string;
  creatorProfile?: UserProfile;
  updaterProfile?: UserProfile;
  studentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
