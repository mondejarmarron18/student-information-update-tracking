import { x8tAsync } from "x8t";
import UserService from "../userService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import CustomError from "../../../utils/CustomError";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import tokens, { refreshTokenCookieOptions } from "../../../constants/tokens";
import userRoles from "../../../constants/userRoles";
import { UpdateOwnPasswordDto } from "../userDtos/updateOwnPasswordDto";
import { ResetPasswordDto } from "../userDtos/resetPasswordDto";
import isRole from "../../../utils/isRole";
import _ from "lodash";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";

export default class UserController {
  private userService: UserService;
  private auditLogService: AuditLogService;

  constructor() {
    this.userService = new UserService();
    this.auditLogService = new AuditLogService();
  }

  registerUser = async (req: Request, res: Response) => {
    const role = req.user?.roleId;
    const roleName = role?.name as string;

    //Role based user creation
    let createdUser = null;

    if (!roleName) {
      //Default role is student if no role is provided
      createdUser = await x8tAsync(this.userService.createStudent(req.body));
    } else if (isRole(roleName).isAdmin().isSuperAdmin().apply()) {
      //Manual registration by super admin or admin
      //Only super admin and admin can create users
      createdUser = await x8tAsync(this.userService.createUser(req.body));
    } else {
      return CustomResponse.sendError(res, {
        ...customErrors.forbidden,
        description: "You do not have permission to create a user.",
      });
    }

    if (!createdUser) {
      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    if (createdUser.error) {
      return CustomResponse.sendHandledError(res, createdUser.error);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id || createdUser.result?._id,
        action: req.user?._id
          ? auditLogAction.CREATED
          : auditLogAction.REGISTERED,
        details: req.user?._id
          ? "Created a user account"
          : "Register an account",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "User created successfully",
      data: createdUser.result,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(this.userService.getUsers());

    if (error) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      message: "Users retrieved successfully",
      data: result,
    });
  };

  loginUser = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(
      this.userService.loginUser(req.body)
    );

    if (error) return CustomResponse.sendHandledError(res, error);

    if (!result?.token || !result?.refreshToken) {
      return CustomResponse.sendError(res, {
        ...customErrors.internalServerError,
        details: "Failed to generate tokens",
      });
    }

    res.cookie(
      tokens.REFRESH_TOKEN,
      result.refreshToken,
      refreshTokenCookieOptions
    );

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: result?.user._id,
        action: auditLogAction.LOGGED_IN,
        details: "User logged in",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      message: "Access Token",
      data: result.token,
    });
  };

  logoutUser = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    res.clearCookie(tokens.REFRESH_TOKEN, refreshTokenCookieOptions);

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.LOGGED_OUT,
        details: "User logged out",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res);
  };

  verifyUser = async (req: Request, res: Response) => {
    const verificationCode = convertToObjectId(req.params.verificationCode);

    if (verificationCode.error || !verificationCode.id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: verificationCode.error || "Invalid verification code",
      });
    }

    const user = await x8tAsync(
      this.userService.verifyUser(verificationCode.id)
    );

    if (user.error) {
      console.error("Error verifying user:", user.error);

      if (user.error instanceof CustomError) {
        return CustomResponse.sendError(res, user.error);
      }

      if (user.error instanceof Error || user.error instanceof MongooseError) {
        return CustomResponse.sendError(res, {
          ...customErrors.badRequest,
          details: user.error.message,
        });
      }

      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: user.result?._id,
        action: auditLogAction.VERIFIED,
        details: "Verified a user account",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res);
  };

  getOwnUser = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    CustomResponse.sendSuccess(res, {
      message: "User retrieved successfully",
      data: user,
    });
  };

  getUserById = async (req: Request, res: Response) => {
    const { error, id } = convertToObjectId(req.params.userId);

    if (error || !id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error || "Invalid user ID",
      });
    }

    const user = await x8tAsync(this.userService.getUserById(id));

    if (user.error) {
      return CustomResponse.sendHandledError(res, user.error);
    }

    CustomResponse.sendSuccess(res, {
      message: "User retrieved successfully",
      data: _.omit(user.result, "password"),
    });
  };

  isAuthenticated = async (req: Request, res: Response) => {
    if (!req.user) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    CustomResponse.sendSuccess(res);
  };

  updateOwnPassword = async (
    req: Request<{}, {}, UpdateOwnPasswordDto>,
    res: Response
  ) => {
    const user = req.user;

    if (!user) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { error } = await x8tAsync(
      this.userService.updateUserPassword(
        user._id,
        req.body.currentPassword,
        req.body.newPassword
      )
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.UPDATED,
        details: "Updated a password",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      message: "Password updated successfully",
    });
  };

  sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { error, result } = await x8tAsync(
      this.userService.sendPasswordResetEmail(req.body.email)
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: result?._id,
        action: auditLogAction.REQUESTED,
        details: "Requested a password reset",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res);
  };

  resetPassword = async (
    req: Request<{}, {}, ResetPasswordDto>,
    res: Response
  ) => {
    const { password, verificationCode } = req.body;

    const validVerificationCode = convertToObjectId(verificationCode);

    if (validVerificationCode.error || !validVerificationCode.id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: validVerificationCode.error || "Invalid verification code",
      });
    }

    const { error, result } = await x8tAsync(
      this.userService.resetPassword({
        password,
        verificationCode: validVerificationCode.id,
      })
    );

    if (error) {
      return CustomResponse.sendHandledError(res, error);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: result?._id,
        action: auditLogAction.UPDATED,
        details: "Reset a password",
        entity: schemaName.USER,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res);
  };
}
