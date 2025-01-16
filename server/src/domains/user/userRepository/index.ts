import { passwordEncrypt } from "../../../utils/password";
import userModel, { IUser } from "../userModel";

export default class UserRepository {
  userModel: typeof userModel;

  constructor() {
    this.userModel = userModel;
  }

  createUser = async (params: Pick<IUser, "email" | "password" | "roleId">) => {
    return this.userModel.create(params);
  };

  getUserByEmail = (email: IUser["email"]) => {
    return this.userModel.findOne({ email: email }).populate("roleId");
  };

  getUserById = (id: IUser["_id"]) => {
    return this.userModel.findById(id).populate("roleId");
  };

  getUsers = () => {
    return this.userModel.find();
  };

  updateUserPassword = (id: IUser["_id"], password: IUser["password"]) => {
    const encryptedPassword = passwordEncrypt(password);

    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        password: encryptedPassword,
        updatedAt: new Date(),
      },
    });
  };

  updateUserRole = (id: IUser["_id"], roleId: IUser["roleId"]) => {
    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        roleId,
      },
    });
  };

  deleteUser = (id: IUser["_id"]) => {
    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        deletedAt: new Date(),
      },
    });
  };

  isUserEmailExists = (email: IUser["email"]) => {
    return this.userModel.exists({ email: email });
  };

  isUserIdExists = (id: IUser["_id"]) => {
    return this.userModel.exists({ _id: id });
  };

  isUserVerified = (id: IUser["_id"]) => {
    return this.userModel.exists({ _id: id, verifiedAt: { $ne: null } });
  };

  verifyUser = (id: IUser["_id"]) => {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          verifiedAt: new Date(),
        },
      }
    );
  };
}
