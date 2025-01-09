import CustomError from "../../../utils/CustomError";
import { IRole } from "../roleModel";
import RoleRepository from "../roleRepository";

export default class RoleService {
  private roleRepository: RoleRepository;
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  createRole = async (params: Pick<IRole, "name" | "description">) => {
    const isRoleNameExist = await this.roleRepository.isRoleNameExist(
      params.name
    );

    if (isRoleNameExist) {
      throw new Error("Role already exists");
    }

    return this.roleRepository.createRole(params);
  };

  updateRole = (
    id: IRole["_id"],
    params: Pick<IRole, "name" | "description">
  ) => {
    return this.roleRepository.updateRole(id, params);
  };

  deleteRole = (id: IRole["_id"]) => {
    return this.roleRepository.deleteRole(id);
  };

  getRoles = () => {
    return this.roleRepository.getRoles();
  };

  createRoles = (roles: Pick<IRole, "name" | "description">[]) => {
    return this.roleRepository.createRoles(roles);
  };

  getRoleById = (id: IRole["_id"]) => {
    return this.roleRepository.getRoleById(id);
  };

  getRoleByName = async (name: IRole["name"]) => {
    const role = this.roleRepository.getRoleByName(name);

    if (!role) {
      CustomError.notFound({
        description: "Role not found",
      });
    }

    return await role;
  };

  isRoleIdExist = (id: IRole["_id"]) => {
    return this.roleRepository.isRoleIdExist(id);
  };

  isRoleNameExist = (name: IRole["name"]) => {
    return this.roleRepository.isRoleNameExist(name);
  };
}
