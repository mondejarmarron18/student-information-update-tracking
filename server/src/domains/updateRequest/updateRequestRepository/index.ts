import { updateRequestStatus } from "../../../constants/updateRequest";
import UpdateRequestModel, { IUpdateRequest } from "../updateRequestModel";

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

  getUpdateRequestById = (id: IUpdateRequest["_id"]) => {
    return this.updateRequestModel.findById(id);
  };

  getUpdateRequestsByRequesterId = (
    requesterId: IUpdateRequest["requesterId"]
  ) => {
    return this.updateRequestModel.find({ requesterId });
  };

  getUpdateRequestsByReviewerId = (
    reviewerId: IUpdateRequest["reviewerId"]
  ) => {
    return this.updateRequestModel.find({ reviewerId });
  };

  getUpdateRequests = () => {
    return this.updateRequestModel.aggregate([
      {
        $lookup: {
          from: "userprofiles",
          localField: "requesterId",
          foreignField: "userId",
          as: "requesterProfile",
        },
      },
      {
        $lookup: {
          from: "userprofiles",
          localField: "reviewerId",
          foreignField: "userId",
          as: "reviewerProfile",
        },
      },
      {
        $unwind: {
          path: "$requesterProfile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: { path: "$reviewerProfile", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          requesterProfile: {
            firstName: "$requesterProfile.firstName",
            lastName: "$requesterProfile.lastName",
          },
          reviewerProfile: {
            firstName: "$reviewerProfile.firstName",
            lastName: "$reviewerProfile.lastName",
          },
        },
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
}
