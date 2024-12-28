import RoleService from "../../domains/role/roleService";

export default class RoleSeeder {
  constructor(private roleService: RoleService) {}

  async seed() {
    const roles = [
      {
        name: "Admin",
        description: "Admin role",
      },
      {
        name: "User",
        description: "User role",
      },
    ];
    await this.roleService.createRoles(roles);

    console.log("Roles seeded successfully");
  }
}
