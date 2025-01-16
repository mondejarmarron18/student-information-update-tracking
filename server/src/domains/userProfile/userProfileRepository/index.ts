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
    return this.userProfileModel.create({
      ...params,
      updatedAt: new Date(),
    });
  };

  getUserProfileById = (id: IUserProfile["_id"]) => {
    return this.userProfileModel.findById({
      _id: id,
      deletedAt: null,
    });
  };

  getUserProfileByUserId = async (userId: IUserProfile["userId"]) => {
    return this.userProfileModel.findOne({
      userId,
      deletedAt: null,
    });
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
          firstName: params.firstName,
          middleName: params.middleName,
          lastName: params.lastName,
          nameExtension: params.nameExtension,
          dateOfBirth: params.dateOfBirth,
          phoneNumber: params.phoneNumber,
          contactMethods: params.contactMethods,
          address: params.address,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );
  };

  updateUserProfileByUserId = (
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.userProfileModel.findOneAndUpdate(
      {
        userId: params.userId,
        deletedAt: null,
      },
      {
        $set: {
          firstName: params.firstName,
          middleName: params.middleName,
          lastName: params.lastName,
          nameExtension: params.nameExtension,
          dateOfBirth: params.dateOfBirth,
          phoneNumber: params.phoneNumber,
          contactMethods: params.contactMethods,
          address: params.address,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );
  };
}
