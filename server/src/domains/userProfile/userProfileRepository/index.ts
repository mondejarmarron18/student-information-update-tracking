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

  isUserProfileUserIdExists = (userId: IUserProfile["userId"]) => {
    return this.userProfileModel.exists({ userId });
  };

  getUserProfiles = () => {
    return this.userProfileModel.find({
      deletedAt: null,
    });
  };

  updateUserProfile = (
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.userProfileModel.findByIdAndUpdate(
      {
        _id: params._id,
      },
      {
        $set: {
          ...params,
        },
      },
      {
        new: true,
      }
    );
  };
}
