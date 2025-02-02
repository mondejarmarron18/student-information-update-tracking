export type Role = {
  _id: string;
  name: "student" | "admin" | "super-admin" | "staff";
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
