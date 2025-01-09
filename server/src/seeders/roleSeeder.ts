import { x8tAsync } from "x8t";
import userRoles from "../constants/userRoles";
import { IRole } from "../domains/role/roleModel";
import RoleService from "../domains/role/roleService";

const roleSeeder = async () => {
  console.log("Seeding roles...");

  const roleService = new RoleService();

  const roles: Omit<IRole, "_id" | "createdAt" | "updatedAt">[] = [
    {
      name: userRoles.ADMIN,
      description: "Administrator - Full access",
    },
    {
      name: userRoles.STUDENT,
      description: "Student - Student pages full access",
    },
    {
      name: userRoles.PARENT,
      description: "Parent - Parent pages full access",
    },
    {
      name: userRoles.TEACHER,
      description: "Teacher - Teacher pages full access",
    },
    {
      name: userRoles.STAFF,
      description: "Staff - Limited access by admins",
    },
  ];

  const { error, result } = await x8tAsync(roleService.createRoles(roles));

  if (error || !result) {
    return console.error("Error seeding roles:", error || "Empty result");
  }

  const resultLength = result.length === roles.length;

  if (!resultLength) {
    return console.error("Error seeding roles:", "Invalid result length");
  }

  console.log("Roles seeded successfully");

  return result;
};

export default roleSeeder;
