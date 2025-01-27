import { Course } from "./course.type";
import { Specialization } from "./specialization.type";
import { YearLevel } from "./yearLevel.type";

export type IGuardian = {
  firstName: string;
  middleName: string;
  lastName: string;
  nameExtension: string;
  relationship: string;
  email: string;
  phoneNumber: string;
};

export type IAcademicProfile = {
  learnerReferenceNumber: string;
  yearLevelId: string;
  courseId: string;
  specializationId: string;
  guardians: IGuardian[];
  yearLevel: YearLevel;
  course: Course;
  specialization: Specialization;
};
