import userRoles, { UserRoles } from "../constants/userRoles";

const isRole = (role: string) => {
  const allowedRoles: UserRoles[] = [];

  const roles = {
    isSuperAdmin: function () {
      allowedRoles.push(userRoles.SUPER_ADMIN);
      return this;
    },

    isAdmin: function () {
      allowedRoles.push(userRoles.ADMIN);
      return this;
    },

    isStaff: function () {
      allowedRoles.push(userRoles.STAFF);
      return this;
    },

    isStudent: function () {
      allowedRoles.push(userRoles.STUDENT);
      return this;
    },

    apply: function () {
      return allowedRoles.includes(role as UserRoles);
    },
  };

  return roles;
};

export default isRole;
