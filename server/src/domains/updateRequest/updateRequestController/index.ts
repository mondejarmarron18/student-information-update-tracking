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
import isRole from "../../../utils/isRole";
import UserService from "../../user/userService";
import CustomError from "../../../utils/CustomError";
import config from "../../../utils/config";

export default class UpdateRequestController {
  private updateRequestService: UpdateRequestService;
  private auditLogService: AuditLogService;
  private userService: UserService;

  constructor() {
    this.updateRequestService = new UpdateRequestService();
    this.auditLogService = new AuditLogService();
    this.userService = new UserService();
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

    await x8tAsync(
      this.userService.sentEmailToUserRoles(
        [userRoles.STAFF, userRoles.ADMIN],
        {
          subject: "Update Request",
          text: `Hi there, A new update request has been submitted by a student and requires your review. Please log in to your account to review the details and take the necessary action. \n\nIf you have any questions or need further assistance, feel free to reach out to the support team.\n\nCheers,\n${config.appName}`,
        }
      ),
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

    if (updateRequest.error || !updateRequest.result) {
      return CustomResponse.sendHandledError(
        res,
        updateRequest.error ||
          CustomError.notFound({
            description: "Update request not found",
          })
      );
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

    await x8tAsync(
      this.userService.sendEmailToUserIds([updateRequest.result.requesterId], {
        subject: "Update Request Status - Approved",
        text: `Hi there,\n\nWe're pleased to inform you that your update request has been approved. Please log in to your account to review the changes. If you have any questions, feel free to contact our support team.\n\nCheers,\n${config.appName}`,
      }),
      {
        log: true,
      }
    );

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
      text: `Hi there,\n\nWe regret to inform you that your update request has been rejected. Please log in to your account to review the details and take any necessary actions. If you have any questions, feel free to contact our support team.\n\nCheers,\n${config.appName}`,
    });

    return CustomResponse.sendSuccess(res, {
      status: 200,
      message: `Update Request Rejected`,
      data: updateRequest.result,
    });
  };

  getUpdateRequestsPassedDays: IControllerFunction = async (req, res) => {
    const days = toInteger(req.query.days) || 30;
    const roleName = req.user?.roleId.name;

    const userId = isRole(`${roleName}`).isStudent().apply()
      ? req.user?._id
      : undefined;

    const { result, error } = await x8tAsync(
      this.updateRequestService.getUpdateRequestsPassedDays(days, userId),
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
    const roleName = req.user?.roleId.name;
    const isStudent = isRole(`${roleName}`).isStudent().apply();
    const userId = isStudent ? req.user?._id : undefined;

    const { result, error } = await x8tAsync(
      this.updateRequestService.getUpdateRequestsPassedMonths(months, userId),
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

  notifyStaleUpdateRequests: IControllerFunction = async (req, res) => {
    const staleSince = req.body.staleSince;

    const { result, error } = await x8tAsync(
      this.updateRequestService.getRequesterStaleUpdateRequests(staleSince)
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    const emails = result?.map(({ requesterAccount }) => {
      const email = requesterAccount?.email;

      if (email) return email;
    });

    if (!emails?.length) {
      return CustomResponse.sendSuccess(res, {
        status: 200,
        message: "No stale update requests found",
        data: emails,
      });
    }

    const { error: sendMailError } = await x8tAsync(
      sendMail({
        to: emails,
        subject: "It’s Been a While – Time to Review Your Profile",
        text: `Hi there,\n\nWe noticed that it’s been a while since you last updated your profile. Keeping your information up to date ensures you don’t miss any important updates or opportunities.\n\nTake a moment to review your details and make any necessary changes if needed.\n\nCheers,\n${config.appName}`,
      })
    );

    if (sendMailError) {
      return CustomResponse.sendHandledError(res, sendMailError);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Requesters with stale update requests notified",
      data: emails,
    });
  };
}
