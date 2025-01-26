import { Course } from "./course.type";
import { UserProfile } from "./userProfile.type";

export interface Specialization {
  _id: string;
  courseId: string;
  course?: Course;
  creatorProfile?: UserProfile;
  updaterProfile?: UserProfile;
  name: string;
  description: string;
  details?: string;
  studentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
