import { uniqueId } from "lodash";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import { faker } from "@faker-js/faker";
import { parse } from "json2csv";
import { x8tAsync, x8tSync } from "x8t";
import customErrors from "../../../constants/customErrors";
import AuditLogService from "../auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { AuditLog } from "../auditLogModel";
import { schemaName } from "../../../constants/schemaName";
import { IUserProfile } from "../../userProfile/userProfileModel";
import { convertToObjectId } from "../../../utils/mongooseUtil";

export default class AuditLogController {
  private auditLogService: AuditLogService;

  constructor() {
    this.auditLogService = new AuditLogService();
  }

  getAuditLogs: IControllerFunction = async (req, res) => {
    const { result, error } = await x8tAsync(
      this.auditLogService.getAuditLogs(),
      { log: true }
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Audit logs retrieved successfully",
      data: result,
    });
  };

  getAuditLogById: IControllerFunction = async (req, res) => {
    const { auditLogId } = req.params;
    const { id } = convertToObjectId(auditLogId);

    if (!id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid audit log ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.auditLogService.getAuditLogById(id),
      { log: true }
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Audit log retrieved successfully",
      data: result,
    });
  };

  downloadAuditLogs: IControllerFunction = async (req, res) => {
    const auditLogs = await x8tAsync(this.auditLogService.getAuditLogs(), {
      log: true,
    });

    if (auditLogs.error) {
      return CustomResponse.sendHandledError(res, auditLogs.error);
    }

    if (!auditLogs.result?.length) {
      return CustomResponse.sendError(res, customErrors.notFound);
    }

    const formattedData = auditLogs.result.map(
      (
        log: AuditLog & {
          userEmail: string;
        }
      ) => {
        return {
          "Time Stamp": log.timestamp,
          ID: log._id,
          "User ID": log.userId,
          "User Email": log.userEmail,
          "Target Entity": log.entity,
          Action: log.action,
          Details: log.details,
          "IP Address": log.ipAddress,
          "User Agent": log.userAgent,
          "Requested URL": log.requestedUrl,
          "Requested Filter": JSON.stringify(log.requestedFilter),
        };
      }
    );

    const { error, result } = x8tSync(() => parse(formattedData));

    res.header("Content-Type", "text/csv");
    res.attachment("audit-logs.csv");

    if (error) {
      return CustomResponse.sendError(res, customErrors.internalServerError);
    }
    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.EXPORTED,
        details: "Exported the audit logs",
        entity: schemaName.AUDIT_LOG,
      }),
      {
        log: true,
      }
    );

    res.send(result);
  };
}
