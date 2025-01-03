import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import { IAcadProfile } from "../acadProfileModel";
import AcadProfileRepository from "../acadProfileRepository";

export default class AcadProfileService {
  acadProfileRepository: AcadProfileRepository;

  constructor() {
    this.acadProfileRepository = new AcadProfileRepository();
  }

  createAcadProfile = async (
    params: Omit<IAcadProfile, "_id" | "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const isAcadProfileUserIdExists = await this.isAcadProfileUserIdExists(
      params.userId
    );
    const isAcadProfileLrnExists = await this.isAcadProfileLrnExists(
      params.learnerReferenceNumber
    );

    if (isAcadProfileUserIdExists || isAcadProfileLrnExists) {
      CustomError.alreadyExists({
        details: "User's academic profile already exists",
      });
    }

    const acadProfile = await x8tAsync(
      this.acadProfileRepository.createAcadProfile(params)
    );

    if (acadProfile.error) {
      CustomError.badRequest({
        details: acadProfile.error,
      });
    }

    if (!acadProfile.result) {
      CustomError.internalServerError();
    }

    return acadProfile.result;
  };

  getAcadProfiles = () => {
    return this.acadProfileRepository.getAcadProfiles();
  };

  getAcadProfileById = async (id: IAcadProfile["_id"]) => {
    const acadProfile = await this.acadProfileRepository.getAcadProfileById(id);

    if (!acadProfile) {
      CustomError.notFound({
        details: "Academic profile not found",
      });
    }

    return acadProfile;
  };

  updateAcadProfile = async (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    const isAcadProfileExists =
      await this.acadProfileRepository.isAcadProfileUserIdExists(params.userId);

    if (isAcadProfileExists) {
      CustomError.alreadyExists({
        details: "User's academic profile already exists",
      });
    }

    const acadProfile = await x8tAsync(
      this.acadProfileRepository.updateAcadProfile(params)
    );

    if (acadProfile.error) {
      CustomError.badRequest({
        details: acadProfile.error,
      });
    }

    if (!acadProfile.result) {
      CustomError.internalServerError();
    }

    return acadProfile.result;
  };

  deleteAcadProfile = async (id: IAcadProfile["_id"]) => {
    const isAcadProfileExists = await this.isAcadProfileUserIdExists(id);

    if (isAcadProfileExists) {
      CustomError.alreadyExists({
        details: "User's academic profile already exists",
      });
    }

    return this.acadProfileRepository.deleteAcadProfile(id);
  };

  isAcadProfileUserIdExists = async (userId: IAcadProfile["userId"]) => {
    const isAcadProfileExists = await x8tAsync(
      this.acadProfileRepository.isAcadProfileUserIdExists(userId)
    );

    if (isAcadProfileExists.error) {
      CustomError.badRequest({
        details: isAcadProfileExists.error,
      });
    }

    return isAcadProfileExists.result;
  };

  isAcadProfileIdExists = async (id: IAcadProfile["_id"]) => {
    const isAcadProfileExists = await x8tAsync(
      this.acadProfileRepository.isAcadProfileIdExists(id)
    );

    if (isAcadProfileExists.error) {
      CustomError.badRequest({
        details: isAcadProfileExists.error,
      });
    }

    return isAcadProfileExists.result;
  };

  isAcadProfileLrnExists = async (
    lrn: IAcadProfile["learnerReferenceNumber"]
  ) => {
    const isAcadProfileExists = await x8tAsync(
      this.acadProfileRepository.isAcadProfileLrnExists(lrn)
    );

    if (isAcadProfileExists.error) {
      CustomError.badRequest({
        details: isAcadProfileExists.error,
      });
    }

    return isAcadProfileExists.result;
  };
}
