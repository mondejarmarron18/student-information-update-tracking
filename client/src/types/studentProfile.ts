import { UserProfile } from "./userProfile.type";

export type StudentProfile = UserProfile & {
  learnerReferenceNumber: string;
  contactMethods: ["email", "phone"];
  guardians: StudentGuardian;
};

export type StudentGuardian = {
  name: string;
  relationship: string;
  email: string;
  phoneNumber: string;
};
