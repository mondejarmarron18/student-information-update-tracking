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
    return this.updateRequestModel.create(params);
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
    return this.updateRequestModel.find();
  };

  isUpdateRequestExists = (id: IUpdateRequest["_id"]) => {
    return this.updateRequestModel.exists({ _id: id });
  };

  reviewUpdateRequest = (
    params: Pick<
      IUpdateRequest,
      "_id" | "reviewerId" | "reviewComment" | "reviewStatus"
    >
  ) => {
    return this.updateRequestModel.findByIdAndUpdate(params._id, {
      $set: params,
    });
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
