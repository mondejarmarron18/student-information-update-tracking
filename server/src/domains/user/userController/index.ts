import { x8tAsync, x8tSync } from "x8t";
import { IUser } from "../userModel";
import UserService from "../userService";
import { Request, Response } from "express";
import { MongooseError } from "mongoose";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import CustomError from "../../../utils/CustomError";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import tokens, { refreshTokenCookieOptions } from "../../../constants/tokens";
import userRoles from "../../../constants/userRoles";

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  registerUser = async (req: Request, res: Response) => {
    const role = req.user?.roleId;

    // Create user based on role
    let createdUser = null;

    if (!role?.name) {
      createdUser = await x8tAsync(this.userService.createStudent(req.body));
    } else {
      // Prevent registering user with same role
      if (role?._id === req.body.roleId) {
        return CustomResponse.sendError(res, {
          ...customErrors.forbidden,
          details: "You can not register user with same role",
        });
      }

      createdUser = await x8tAsync(this.userService.createUser(req.body));
    }

    if (!createdUser) {
      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    if (createdUser.error) {
      return CustomResponse.sendHandledError(res, createdUser.error);
    }

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
}
