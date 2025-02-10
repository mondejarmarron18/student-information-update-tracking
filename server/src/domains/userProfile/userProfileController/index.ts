import { MongooseError } from "mongoose";
import UserProfileService from "../userProfileService";
import { Request, Response } from "express";
import { x8tAsync } from "x8t";
import CustomResponse from "../../../utils/CustomResponse";
import CustomError from "../../../utils/CustomError";
import customErrors from "../../../constants/customErrors";
import { IControllerFunction } from "../../../types/controller";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";

export default class UserProfileController {
  private userProfileService: UserProfileService;
  private auditLogService: AuditLogService;

  constructor() {
    this.userProfileService = new UserProfileService();
    this.auditLogService = new AuditLogService();
  }

  getUserProfiles: IControllerFunction = async (req, res) => {
    const { result, error } = await x8tAsync(
      this.userProfileService.getUserProfiles()
    );

    if (error !== null || result === null) {
      console.error("Error getting user profiles:", error);

      if (error instanceof CustomError) {
        return CustomResponse.sendError(res, error);
      }

      if (error instanceof MongooseError) {
        return CustomResponse.sendError(res, {
          ...customErrors.badRequest,
          details: error.message,
        });
      }

      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    CustomResponse.sendSuccess(res, {
      message: "User profiles retrieved successfully",
      data: result,
    });
  };

  createUserProfile: IControllerFunction = async (req, res) => {
    const { result, error } = await x8tAsync(
      this.userProfileService.createUserProfile({
        ...req.body,
        userId: req.user?._id,
      })
    );

    if (error !== null || result === null) {
      console.error("Error getting user profiles:", error);

      if (error instanceof CustomError) {
        return CustomResponse.sendError(res, error);
      }

      if (error instanceof MongooseError) {
        return CustomResponse.sendError(res, {
          ...customErrors.badRequest,
          details: error.message,
        });
      }

      await x8tAsync(
        this.auditLogService.createAuditLog({
          ...req.auditLog!,
          userId: req.user?._id,
          action: auditLogAction.CREATED,
          details: "Created an user profile",
          entity: schemaName.USER_PROFILE,
        }),
        {
          log: true,
        }
      );

      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "User profile created successfully",
      data: result,
    });
  };

  getOwnUserProfile: IControllerFunction = async (req, res) => {
    const user = req.user;

    if (!user) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { result, error } = await x8tAsync(
      this.userProfileService.getUserProfileByUserId(user._id)
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      message: "User Profile",
      data: result,
    });
  };
}
