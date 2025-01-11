import { Types } from "mongoose";
import { IUserProfile } from "../userProfileModel";
import UserProfileRepository from "../userProfileRepository";
import CustomError from "../../../utils/CustomError";
import { x8tAsync } from "x8t";

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

  getUserProfileByUserId = async (userId: IUserProfile["userId"]) => {
    const userProfile = await this.userProfileRepository.getUserProfileByUserId(
      userId
    );

    if (!userProfile) {
      CustomError.notFound({
        details: "User's profile does not exist",
      });
    }

    return userProfile;
  };

  updateUserProfile = async (
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const userProfile = await x8tAsync(
      this.userProfileRepository.updateUserProfile(params)
    );

    if (userProfile.error) {
      CustomError.badRequest({
        details: userProfile.error,
      });
    }

    if (!userProfile.result) {
      CustomError.notFound({
        details: "User's profile does not exist",
      });
    }

    return userProfile.result;
  };

  updateUserProfileByUserId = async (
    params: Omit<IUserProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const userProfile = await x8tAsync(
      this.userProfileRepository.updateUserProfileByUserId(params)
    );

    if (userProfile.error) {
      CustomError.badRequest({
        details: userProfile.error,
      });
    }

    if (!userProfile.result) {
      CustomError.notFound({
        details: "User's profile does not exist",
      });
    }

    return userProfile.result;
  };
}
