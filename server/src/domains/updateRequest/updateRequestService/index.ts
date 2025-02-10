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
import { sendMail } from "../../../utils/email";

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

    //Send update request notif to staff's emails
    //  await sendMail({
    //   to: email,
    //   subject: "Account Verification",
    //   html: await hbs("emailVerification", {
    //     verificationUrl: `${config.clientUrl}/email-verification/${verificationCode}`,
    //     supportEmail: config.smtp.sender,
    //     appName: config.appName,
    //     expireIn: "24 hours",
    //     website: {
    //       domain: config.clientUrl?.replace(/(http|https):\/\//, ""),
    //       url: config.clientUrl,
    //     },
    //   }),
    // });

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

  getUpdateRequestsByRequesterId = async (
    id: IUpdateRequest["requesterId"]
  ) => {
    const updateRequests = await x8tAsync(
      this.updateRequestRepository.getUpdateRequestsByRequesterId(id)
    );

    if (updateRequests.error) {
      CustomError.badRequest({
        description: "Failed to get update requests",
        details: updateRequests.error,
      });
    }

    return updateRequests.result;
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

    const updateReq = await x8tAsync(
      this.updateRequestRepository.getUpdateRequestById(_id)
    );

    if (updateReq.error) {
      CustomError.badRequest({
        details: updateReq.error,
      });
    }

    if (updateReq.result?.reviewStatus !== updateRequestStatus.pending) {
      CustomError.alreadyExists({
        description: "Update request already reviewed",
      });
    }

    if (updateReq.result?.requesterId.toString() === reviewerId.toString()) {
      return CustomError.badRequest({
        description: "You are not authorized to review this request",
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

      await this.acadProfileService.updateAcadProfileByUserId(acadProfile);
    }

    // Update User Profile
    if (contentType === updateRequestContentType.USER_PROFILE) {
      const userProfile = updateRequest.result.content.current;

      userProfile.userId = updateRequest.result.requesterId;

      await this.userProfileService.updateUserProfileByUserId(userProfile);
    }

    return updateRequest.result;
  };

  getUpdateRequestsPassedDays = async (
    days: number,
    userId?: IUpdateRequest["requesterId"]
  ) => {
    let updateRequests;

    if (!userId) {
      updateRequests = await x8tAsync(
        this.updateRequestRepository.getUpdateRequestsPassedDays(days)
      );
    } else {
      updateRequests = await x8tAsync(
        this.updateRequestRepository.getOwnUpdateRequestsPassedDays(
          days,
          userId
        )
      );
    }

    if (updateRequests.error) {
      CustomError.badRequest({
        description: "Failed to get update requests",
        details: updateRequests.error,
      });
    }

    return updateRequests.result;
  };

  getUpdateRequestsPassedMonths = async (
    months: number,
    userId?: IUpdateRequest["requesterId"]
  ) => {
    let updateRequests;

    if (!userId) {
      updateRequests = await x8tAsync(
        this.updateRequestRepository.getUpdateRequestsPassedMonths(months)
      );
    } else {
      updateRequests = await x8tAsync(
        this.updateRequestRepository.getOwnUpdateRequestsPassedMonths(
          months,
          userId
        )
      );
    }

    if (updateRequests.error) {
      CustomError.badRequest({
        description: "Failed to get update requests",
        details: updateRequests.error,
      });
    }

    return updateRequests.result;
  };
}
