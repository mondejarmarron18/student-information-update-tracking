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
  yearLevel: number;
  course: string;
  specialization: string;
  guardians: IGuardian[];
};
