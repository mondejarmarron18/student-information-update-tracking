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

    const formattedData = auditLogs.result.map((log: AuditLog) => {
      return {
        ID: log._id,
        "User ID": log.userId,
        "Entity Name (Database Collection Name)": log.entityName,
        "Entity ID (Database Document ID)": log.entityId,
        Action: log.action,
        Details: log.details,
        "IP Address": log.ipAddress,
        "User Agent": log.userAgent,
        "Time Stamp": log.timestamp,
      };
    });

    const { error, result } = x8tSync(() => parse(formattedData));

    res.header("Content-Type", "text/csv");
    res.attachment("audit-logs.csv");

    if (error) {
      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    res.send(result);
  };

  createAuditLog: IControllerFunction = async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { result, error } = await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.body,
        userId,
      }),
      { log: true }
    );

    if (error) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Audit log created successfully",
      data: result,
    });
  };
}
