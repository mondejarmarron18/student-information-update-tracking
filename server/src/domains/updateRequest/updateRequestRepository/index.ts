import { PipelineStage, Types } from "mongoose";
import { updateRequestStatus } from "../../../constants/updateRequest";
import UpdateRequestModel, { IUpdateRequest } from "../updateRequestModel";
import {
  replaceContentIdsWithData,
  requesterAccount,
  requesterProfile,
  reviewerAccount,
  reviewerProfile,
  updateRequestsPassedDays,
  updateRequestsPassedMonths,
} from "./updateRequestPipelines";
import { subDays } from "date-fns";

export default class updateRequestRepository {
  private updateRequestModel: typeof UpdateRequestModel;

  constructor() {
    this.updateRequestModel = UpdateRequestModel;
  }

  createUpdateRequest = (
    params: Pick<IUpdateRequest, "requesterId" | "contentType" | "content">
  ) => {
    return this.updateRequestModel.create({
      requesterId: params.requesterId,
      contentType: params.contentType,
      content: params.content,
    });
  };

  getUpdateRequestById = async (id: IUpdateRequest["_id"]) => {
    const updateRequest = await this.updateRequestModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      ...replaceContentIdsWithData,
      {
        $limit: 1,
      },
    ]);

    return updateRequest.length > 0 ? updateRequest[0] : null;
  };

  getUpdateRequestsByRequesterId = (
    requesterId: IUpdateRequest["requesterId"]
  ) => {
    return this.updateRequestModel.aggregate([
      {
        $match: {
          requesterId: new Types.ObjectId(requesterId),
        },
      },
      ...requesterProfile,
      ...reviewerProfile,
      {
        $sort: {
          requestedAt: -1,
          reviewdAt: -1,
        },
      },
    ]);
  };

  getUpdateRequestsByReviewerId = (
    reviewerId: IUpdateRequest["reviewerId"]
  ) => {
    return this.updateRequestModel.find({ reviewerId });
  };

  getUpdateRequests = () => {
    return this.updateRequestModel.aggregate([
      ...requesterAccount,
      ...requesterProfile,
      ...reviewerProfile,
      {
        $sort: {
          reviewdAt: -1,
          requestedAt: 1,
        },
      },
    ]);
  };

  getRequesterStaleUpdateRequests = (staleSince: Date) => {
    return this.updateRequestModel.aggregate([
      ...requesterAccount,
      {
        $match: {
          requestedAt: {
            $lte: staleSince,
          },
          requesterAccount: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: "$requesterId",
          requests: { $push: "$$ROOT" },
        },
      },
      {
        $match: {
          "requests.reviewStatus": {
            $ne: updateRequestStatus.pending,
          },
        },
      },
      {
        $project: {
          _id: 1,
          request: {
            $arrayElemAt: ["$requests", 0],
          },
        },
      },
      {
        $replaceRoot: { newRoot: "$request" },
      },
      {
        $sort: {
          requestedAt: -1,
          reviewdAt: -1,
        },
      },
    ]);
  };

  isUpdateRequestExists = (id: IUpdateRequest["_id"]) => {
    return this.updateRequestModel.exists({ _id: id });
  };

  reviewUpdateRequest = (
    params: Pick<
      IUpdateRequest,
      "_id" | "reviewerId" | "reviewComment" | "reviewStatus" | "reviewedAt"
    >
  ) => {
    return this.updateRequestModel.findByIdAndUpdate(
      {
        _id: params._id,
        reviewStatus: updateRequestStatus.pending,
      },
      {
        $set: {
          reviewerId: params.reviewerId,
          reviewComment: params.reviewComment,
          reviewStatus: params.reviewStatus,
          reviewedAt: params.reviewedAt,
        },
      },
      {
        new: true,
      }
    );
  };

  isAlreadyReviewed = (id: IUpdateRequest["_id"]) => {
    return this.updateRequestModel.exists({
      _id: id,
      reviewStatus: { $ne: updateRequestStatus.pending },
    });
  };

  hasPendingUpdateRequest = (
    params: Pick<IUpdateRequest, "requesterId" | "contentType">
  ) => {
    return this.updateRequestModel.exists({
      requesterId: params.requesterId,
      contentType: params.contentType,
      reviewStatus: updateRequestStatus.pending,
    });
  };

  getUpdateRequestsPassedDays = async (days: number) => {
    const updateRequests = await this.updateRequestModel.aggregate(
      updateRequestsPassedDays(days)
    );

    return updateRequests.length > 0 ? updateRequests[0] : null;
  };

  getOwnUpdateRequestsPassedDays = async (
    days: number,
    userId: IUpdateRequest["requesterId"]
  ) => {
    const requesterId = userId ? new Types.ObjectId(userId) : undefined;

    const updateRequests = await this.updateRequestModel.aggregate([
      {
        $match: {
          requesterId,
        },
      },
      ...updateRequestsPassedDays(days),
    ]);

    return updateRequests.length > 0 ? updateRequests[0] : null;
  };

  getUpdateRequestsPassedMonths = (months: number) => {
    return this.updateRequestModel.aggregate(
      updateRequestsPassedMonths(months)
    );
  };

  getOwnUpdateRequestsPassedMonths = (
    months: number,
    userId: IUpdateRequest["requesterId"]
  ) => {
    const requesterId = userId ? new Types.ObjectId(userId) : undefined;

    return this.updateRequestModel.aggregate([
      { $match: { requesterId } },
      ...updateRequestsPassedMonths(months),
    ]);
  };
}
