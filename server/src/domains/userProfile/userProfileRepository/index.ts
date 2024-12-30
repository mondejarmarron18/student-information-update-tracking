import { TypeOf } from "zod";
import userProfileModel, { IUserProfile } from "../userProfileModel";
import UserProfileModel from "../userProfileModel";

export default class UserProfileRepository {
  userProfileModel: typeof UserProfileModel;

  constructor() {
    this.userProfileModel = userProfileModel;
  }

  createUserProfile = (
    params: Omit<IUserProfile, "_id" | "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.userProfileModel.create(params);
  };

  getUserProfileById = (id: IUserProfile["_id"]) => {
    return this.userProfileModel.findById(id);
  };

  getUserProfiles = () => {
    return this.userProfileModel.find();
  };

  updateUserProfile = (
    id: IUserProfile["_id"],
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.userProfileModel.findByIdAndUpdate(id, {
      $set: {
        ...params,
      },
    });
  };
}
