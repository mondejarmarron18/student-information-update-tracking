import { uniqueId, update } from "lodash";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import { faker } from "@faker-js/faker";
import { parse } from "json2csv";
import { x8tSync } from "x8t";
import customErrors from "../../../constants/customErrors";

const auditLogAction = {
  created: "created",
  updated: "updated",
  deleted: "deleted",
  approved: "approved",
  rejected: "rejected",
  viewed: "viewed",
  exported: "exported",
  archived: "archived",
  restored: "restored",
  submitted: "submitted",
  loggedIn: "logged in",
  loggedOut: "logged out",
  requested: "requested",
};

type IAuditLog = {
  _id: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  action: (typeof auditLogAction)[keyof typeof auditLogAction];
  details: string;
  timestamp: Date;
};

const data: IAuditLog[] = [...Array(20)].map(() => {
  const action =
    Object.keys(auditLogAction)[
      Math.floor(Math.random() * Object.keys(auditLogAction).length)
    ];

  return {
    _id: uniqueId(),
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
    userId: uniqueId(),
    timestamp: faker.date.past(),
    action,
    details: `${action} ${faker.lorem.sentence()}`,
  };
});

export default class AuditLogController {
  getAuditLogs: IControllerFunction = async (req, res) => {
    //  {
    //   ipAddress: req.ip?.split(":").pop(),
    //   userAgent: req.headers["user-agent"],
    //   userId: req.user?._id,
    //   details: "Logged in",
    //   timestamp: faker,
    // };

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Audit logs retrieved successfully",
      data,
    });
  };

  downloadAuditLogs: IControllerFunction = async (req, res) => {
    const formattedData = data.map((log) => {
      return {
        "User ID": log.userId,
        "IP Address": log.ipAddress,
        Action: log.action,
        Details: log.details,
        "User Agent": log.userAgent,
        Timestamp: log.timestamp.toISOString(),
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
}
