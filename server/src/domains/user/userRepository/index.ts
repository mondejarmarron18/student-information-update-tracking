import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";
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
    return this.userModel.findById(id).populate("roleId").lean();
  };

  getUsers = (filter?: PipelineStage.Match["$match"]) => {
    return this.userModel.aggregate([
      {
        $match: { ...filter },
      },
      {
        $lookup: {
          from: schemaName.ROLE,
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: schemaName.USER_PROFILE,
          localField: "_id",
          foreignField: "userId",
          as: "profile",
        },
      },
      {
        $unwind: {
          path: "$profile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          password: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
          verifiedAt: -1,
        },
      },
    ]);
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

  getUsersByIds = (ids: IUser["_id"][]) => {
    return this.userModel.find({ _id: { $in: ids } });
  };

  getUsersByRoleIds = (roleId: IUser["roleId"][]) => {
    return this.userModel.find({ roleId: { $in: roleId } });
  };

  getUsersByRoleNames = (roleNames: string[]) => {
    return this.userModel.aggregate([
      {
        $lookup: {
          from: schemaName.ROLE,
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $match: {
          "role.name": { $in: roleNames },
        },
      },
    ]);
  };
}
