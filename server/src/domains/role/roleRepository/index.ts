import roleModel, { IRole } from "../roleModel";

export default class RoleRepository {
  private roleModel: typeof roleModel;

  constructor() {
    this.roleModel = roleModel;
  }

  createRole = (params: Pick<IRole, "name" | "description">) => {
    return this.roleModel.create(params);
  };

  updateRole = (
    id: IRole["_id"],
    params: Pick<IRole, "name" | "description">
  ) => {
    return this.roleModel.findByIdAndUpdate(id, {
      $set: {
        ...params,
      },
    });
  };

  deleteRole = (id: IRole["_id"]) => {
    return this.roleModel.findByIdAndUpdate(id, {
      $set: {
        deletedAt: new Date(),
      },
    });
  };

  getRoles = () => {
    return this.roleModel.find();
  };

  createRoles = (roles: Pick<IRole, "name" | "description">[]) => {
    return this.roleModel.insertMany(roles);
  };

  getRoleByName = (name: IRole["name"]) => {
    return this.roleModel.findOne({ name });
  };

  getRoleById = (id: IRole["_id"]) => {
    return this.roleModel.findById(id);
  };

  isRoleIdExist = (id: IRole["_id"]) => {
    return this.roleModel.exists({ _id: id });
  };

  isRoleNameExist = (name: IRole["name"]) => {
    return this.roleModel.exists({ name });
  };
}
