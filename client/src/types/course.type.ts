export interface Course {
  _id: string;
  name: string;
  description: string;
  specializationIds: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
