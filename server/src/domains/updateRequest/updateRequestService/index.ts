import { x8tAsync } from "x8t";
import { IUpdateRequest, IUpdateRequestContent } from "../updateRequestModel";
import updateRequestRepository from "../updateRequestRepository";
import CustomError from "../../../utils/CustomError";
import {
  updateRequestContentType,
  updateRequestStatus,
} from "../../../constants/updateRequest";

import AcadProfileService from "../../acadProfile/acadProfileService";
import UserProfileService from "../../userProfile/userProfileService";
import { IUserProfile } from "../../userProfile/userProfileModel";
import { IAcadProfile } from "../../acadProfile/acadProfileModel";
import { Types } from "mongoose";

export default class UpdateRequestService {
  private updateRequestRepository: updateRequestRepository;
  private userProfileService: UserProfileService;
  private acadProfileService: AcadProfileService;

  constructor() {
    this.updateRequestRepository = new updateRequestRepository();
    this.userProfileService = new UserProfileService();
    this.acadProfileService = new AcadProfileService();
  }

  createUpdateRequest = async (
    params: Pick<IUpdateRequest, "requesterId" | "contentType"> & {
      content: IUpdateRequest["content"]["current"];
    }
  ) => {
    const { requesterId, contentType, content } = params;
    let previousContent: IUserProfile | IAcadProfile | null = null;

    if (contentType === updateRequestContentType.ACAD_PROFILE) {
      previousContent = await this.acadProfileService.getAcadProfileByUserId(
        requesterId
      );
    }

    if (contentType === updateRequestContentType.USER_PROFILE) {
      previousContent = await this.userProfileService.getUserProfileByUserId(
        requesterId
      );
    }

    if (!previousContent) {
      return CustomError.notFound({
        description: "Update request previous content not found",
      });
    }

    const hasPendingRequest = await x8tAsync(
      this.updateRequestRepository.hasPendingUpdateRequest({
        requesterId,
        contentType,
      })
    );

    if (hasPendingRequest.error) {
      CustomError.badRequest({
        description: "Failed to check pending update request",
        details: hasPendingRequest.error,
      });
    }

    if (hasPendingRequest.result) {
      CustomError.alreadyExists({
        description:
          "You have a pending update request with this content type. Try again once it is approved or rejected.",
      });
    }

    const updateRequest = await x8tAsync(
      this.updateRequestRepository.createUpdateRequest({
        requesterId,
        contentType,
        content: {
          previous: previousContent,
          current: {
            ...content,
            userId: previousContent.userId,
          },
        } as IUpdateRequest["content"],
      })
    );

    if (updateRequest.error) {
      CustomError.badRequest({
        description: "Failed to create update request",
        details: updateRequest.error,
      });
    }

    return updateRequest.result;
  };

  getUpdateRequestById = async (id: IUpdateRequest["_id"]) => {
    const updateRequest = await x8tAsync(
      this.updateRequestRepository.getUpdateRequestById(id)
    );

    if (updateRequest.error) {
      CustomError.badRequest({
        description: "Failed to get update request",
        details: updateRequest.error,
      });
    }

    if (!updateRequest.result) {
      CustomError.notFound({
        description: "Update request not found",
      });
    }

    return updateRequest.result;
  };

  getUpdateRequests = async () => {
    const updateRequests = await x8tAsync(
      this.updateRequestRepository.getUpdateRequests()
    );

    if (updateRequests.error) {
      CustomError.badRequest({
        description: "Failed to get update requests",
        details: updateRequests.error,
      });
    }

    return updateRequests.result;
  };

  reviewUpdateRequest = async (
    params: Pick<
      IUpdateRequest,
      "_id" | "reviewerId" | "reviewStatus" | "reviewComment"
    >
  ) => {
    const { _id, reviewerId, reviewStatus, reviewComment } = params;

    const isAlreadyReviewed = await x8tAsync(
      this.updateRequestRepository.isAlreadyReviewed(_id)
    );

    if (isAlreadyReviewed.error) {
      CustomError.badRequest({
        details: isAlreadyReviewed.error,
      });
    }

    // Update request not found
    if (isAlreadyReviewed.result) {
      CustomError.alreadyExists({
        description: "Update request already reviewed",
      });
    }

    const updateRequest = await x8tAsync(
      this.updateRequestRepository.reviewUpdateRequest({
        _id,
        reviewerId,
        reviewStatus,
        reviewComment,
        reviewedAt: new Date(),
      })
    );

    if (updateRequest.error) {
      CustomError.badRequest({
        description: "Failed to review update request",
        details: updateRequest.error,
      });
    }

    // If update request is not approved, don't update acad or user profile
    if (updateRequest.result?.reviewStatus !== updateRequestStatus.approved) {
      return updateRequest.result;
    }

    const contentType = updateRequest.result?.contentType;

    // Update Acad Profile
    if (contentType === updateRequestContentType.ACAD_PROFILE) {
      const acadProfile = updateRequest.result.content.current;

      acadProfile.userId = updateRequest.result.requesterId;

      const updateAcadProfile = await x8tAsync(
        this.acadProfileService.updateAcadProfileByUserId(acadProfile)
      );

      if (updateAcadProfile.error) {
        CustomError.badRequest({
          description: "Failed to update academic profile",
          details: updateAcadProfile.error,
        });
      }
    }

    // Update User Profile
    if (contentType === updateRequestContentType.USER_PROFILE) {
      const userProfile = updateRequest.result.content.current;

      userProfile.userId = updateRequest.result.requesterId;

      const updateUserProfile = await x8tAsync(
        this.userProfileService.updateUserProfileByUserId(userProfile)
      );

      if (updateUserProfile.error) {
        CustomError.badRequest({
          description: "Failed to update user profile",
          details: updateUserProfile.error,
        });
      }
    }

    return updateRequest.result;
  };
}
