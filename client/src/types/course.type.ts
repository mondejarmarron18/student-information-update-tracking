import { UserProfile } from "./userProfile.type";

export interface Course {
  _id: string;
  name: string;
  description: string;
  details?: string;
  creatorId: string;
  updaterId: string;
  specializationsCount: number;
  studentsCount: number;
  creatorProfile?: UserProfile;
  updaterProfile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
