import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import UpdateRequestService from "../updateRequestService";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { updateRequestStatus } from "../../../constants/updateRequest";
import userRoles from "../../../constants/userRoles";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import { toInteger } from "lodash";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";
import { sendMail } from "../../../utils/email";

export default class UpdateRequestController {
  private updateRequestService: UpdateRequestService;
  private auditLogService: AuditLogService;

  constructor() {
    this.updateRequestService = new UpdateRequestService();
    this.auditLogService = new AuditLogService();
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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.REQUESTED,
        details: "Requested an update",
        entity: schemaName.UPDATE_REQUEST,
      }),
      {
        log: true,
      }
    );

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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.APPROVED,
        details: "Approved an update request",
        entity: schemaName.UPDATE_REQUEST,
      }),
      {
        log: true,
      }
    );

    await sendMail({
      to: req.user?.email,
      subject: "Update Request Status - Approved",
      text: "We're pleased to inform you that your update request has been approved. Please log in to your account to review the changes. If you have any questions, feel free to contact our support team.",
    });

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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.REJECTED,
        details: "Rejected an update request",
        entity: schemaName.UPDATE_REQUEST,
      }),
      {
        log: true,
      }
    );

    await sendMail({
      to: req.user?.email,
      subject: "Update Request Status - Rejected",
      text: "We regret to inform you that your update request has been rejected. Please log in to your account to review the details and take any necessary actions. If you have any questions, feel free to contact our support team.",
    });

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update Request Rejected`,
      data: updateRequest.result,
    });
  };

  getUpdateRequestsPassedDays: IControllerFunction = async (req, res) => {
    const days = toInteger(req.query.days) || 30;

    const { result, error } = await x8tAsync(
      this.updateRequestService.getUpdateRequestsPassedDays(days),
      {
        log: true,
      }
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Update Requests Passed Days",
      data: result,
    });
  };

  getUpdateRequestsPassedMonths: IControllerFunction = async (req, res) => {
    const months = toInteger(req.query.months) || 12;

    const { result, error } = await x8tAsync(
      this.updateRequestService.getUpdateRequestsPassedMonths(months),
      {
        log: true,
      }
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Update Requests Passed Months",
      data: result,
    });
  };
}
