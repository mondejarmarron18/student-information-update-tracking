import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import UpdateRequestService from "../updateRequestService";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import {
  updateRequestStatus,
  updateRequestStatusKeys,
  updateRequestStatusValues,
} from "../../../constants/updateRequest";
import { convertToObjectId } from "../../../utils/mongooseUtil";

export default class UpdateRequestController {
  updateRequestService: UpdateRequestService;

  constructor() {
    this.updateRequestService = new UpdateRequestService();
  }

  createUpdateRequest: IControllerFunction = async (req, res) => {
    const requesterId = req.user?._id;

    if (!requesterId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.createUpdateRequest({
        ...req.body,
        requesterId,
      })
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Update request created successfully",
      data: updateRequest.result,
    });
  };

  getUpdateRequests: IControllerFunction = async (req, res) => {
    const updateRequests = await x8tAsync(
      this.updateRequestService.getUpdateRequests()
    );

    if (updateRequests.error) {
      return CustomResponse.sendHandledError(res, updateRequests.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Update requests fetched successfully",
      data: updateRequests.result,
    });
  };

  getUpdateRequestById: IControllerFunction = async (req, res) => {
    const { id, error } = convertToObjectId(req.params.id);

    if (!id || error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: error || "Invalid update request ID",
      });
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.getUpdateRequestById(id)
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    if (!updateRequest.result) {
      return CustomResponse.sendError(res, {
        ...customErrors.notFound,
        description: "Update request not found",
      });
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Update request fetched successfully",
      data: updateRequest.result,
    });
  };

  approveUpdateRequest: IControllerFunction = async (req, res) => {
    const reviewerId = req.user?._id;

    if (!reviewerId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.reviewUpdateRequest({
        ...req.body,
        reviewerId,
        reviewStatus: updateRequestStatus.approved,
      })
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update request has been approved successfully`,
      data: updateRequest.result,
    });
  };

  rejectUpdateRequest: IControllerFunction = async (req, res) => {
    const reviewerId = req.user?._id;

    if (!reviewerId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.reviewUpdateRequest({
        ...req.body,
        reviewerId,
        reviewStatus: updateRequestStatus.rejected,
      })
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update request has been rejected successfully`,
      data: updateRequest.result,
    });
  };
}
