import { Types } from "mongoose";
import { IUserProfile } from "../userProfileModel";
import UserProfileRepository from "../userProfileRepository";
import CustomError from "../../../utils/CustomError";

export default class UserProfileService {
  userProfileRepository: UserProfileRepository;

  constructor() {
    this.userProfileRepository = new UserProfileRepository();
  }

  createUserProfile = async (
    params: Omit<IUserProfile, "_id" | "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const isUserIdExists =
      await this.userProfileRepository.isUserProfileUserIdExists(params.userId);

    if (isUserIdExists) {
      CustomError.alreadyExists({
        details: "User's profile already exists",
      });
    }

    return this.userProfileRepository.createUserProfile(params);
  };

  getUserProfiles = () => {
    return this.userProfileRepository.getUserProfiles();
  };

  getUserProfileById = (id: Types.ObjectId) => {
    return this.userProfileRepository.getUserProfileById(id);
  };

  updateUserProfile = (
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const isUserIdExists = this.userProfileRepository.isUserProfileUserIdExists(
      params.userId
    );

    if (!isUserIdExists) {
      CustomError.alreadyExists({
        description: "User's profile does not exist",
      });
    }

    return this.userProfileRepository.updateUserProfile(params);
  };
}
