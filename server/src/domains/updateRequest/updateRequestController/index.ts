import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import UpdateRequestService from "../updateRequestService";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { updateRequestStatus } from "../../../constants/updateRequest";
import userRoles from "../../../constants/userRoles";
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
      message: "Update Request Created",
      data: updateRequest.result,
    });
  };

  getUpdateRequests: IControllerFunction = async (req, res) => {
    const user = req.user;

    if (!user) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    let updateRequests;

    if (user?.roleId.name !== userRoles.STUDENT) {
      updateRequests = await x8tAsync(
        this.updateRequestService.getUpdateRequests()
      );
    } else {
      updateRequests = await x8tAsync(
        this.updateRequestService.getUpdateRequestsByRequesterId(user._id)
      );
    }

    if (updateRequests.error) {
      return CustomResponse.sendHandledError(res, updateRequests.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Update Requests",
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
      message: "Update Request",
      data: updateRequest.result,
    });
  };

  approveUpdateRequest: IControllerFunction = async (req, res) => {
    const reviewerId = req.user?._id;

    if (!reviewerId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const convertedId = convertToObjectId(req.params.id);

    if (!convertedId.id || convertedId.error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: convertedId.error || "Invalid update request ID",
      });
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.reviewUpdateRequest({
        _id: convertedId.id,
        reviewerId,
        reviewStatus: updateRequestStatus.approved,
        reviewComment: req.body.reviewComment,
      })
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update Request Approved`,
      data: updateRequest.result,
    });
  };

  rejectUpdateRequest: IControllerFunction = async (req, res) => {
    const reviewerId = req.user?._id;

    if (!reviewerId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const convertedId = convertToObjectId(req.params.id);

    if (!convertedId.id || convertedId.error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: convertedId.error || "Invalid update request ID",
      });
    }

    const updateRequest = await x8tAsync(
      this.updateRequestService.reviewUpdateRequest({
        _id: convertedId.id,
        reviewerId,
        reviewStatus: updateRequestStatus.rejected,
        reviewComment: req.body.reviewComment,
      })
    );

    if (updateRequest.error) {
      return CustomResponse.sendHandledError(res, updateRequest.error);
    }

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update Request Rejected`,
      data: updateRequest.result,
    });
  };
}
