export type Role = {
  id: string;
  name: "student" | "admin" | "staff";
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
