const userRoles = {
  ADMIN: "admin",
  STUDENT: "student",
  PARENT: "parent",
  TEACHER: "teacher",
  STAFF: "staff",
} as const;

export const userRolesValues = Object.values(userRoles);
export const userRolesKeys = Object.keys(userRoles);

export type UserRoles = (typeof userRoles)[keyof typeof userRoles];

export default userRoles;
