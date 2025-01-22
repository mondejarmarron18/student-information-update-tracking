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
};
