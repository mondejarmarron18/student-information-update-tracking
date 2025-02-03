const userRoles = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  STUDENT: "student",
  PARENT: "parent",
  TEACHER: "teacher",
  STAFF: "staff",
  NO_ROLE: "",
} as const;

export const userRolesValues = Object.values(userRoles);
export const userRolesKeys = Object.keys(userRoles);

export type UserRoles = (typeof userRoles)[keyof typeof userRoles];

export default userRoles;
