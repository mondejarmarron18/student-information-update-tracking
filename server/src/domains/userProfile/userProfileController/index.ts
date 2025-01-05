import { MongooseError } from "mongoose";
import UserProfileService from "../userProfileService";
import { Request, Response } from "express";
import { x8tAsync } from "x8t";
import CustomResponse from "../../../utils/CustomResponse";
import CustomError from "../../../utils/CustomError";
import customErrors from "../../../constants/customErrors";
import { IControllerFunction } from "../../../types/controller";

export default class UserProfileController {
  userProfileService: UserProfileService;

  constructor() {
    this.userProfileService = new UserProfileService();
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
    console.log(req.user);
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

      return CustomResponse.sendError(res, customErrors.internalServerError);
    }

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "User profile created successfully",
      data: result,
    });
  };
}
