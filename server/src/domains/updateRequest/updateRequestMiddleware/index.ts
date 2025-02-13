import {
  validateCreateUpdateRequest,
  validateGetUpdateRequestsPassedDays,
  validateGetUpdateRequestsPassedMonths,
  validateNotifyStaleUpdateRequests,
} from "./validationSchema";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { z } from "zod";

export default class UpdateRequestMiddleware {
  createUpdateRequest: IMiddleware = (req, res, next) => {
    const { error } = validateCreateUpdateRequest.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  getUpdateRequestsPassedDays: IMiddleware = (req, res, next) => {
    const { error } = validateGetUpdateRequestsPassedDays.safeParse(req.query);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  getUpdateRequestsPassedMonths: IMiddleware = (req, res, next) => {
    const { error, data } = validateGetUpdateRequestsPassedMonths.safeParse(
      req.query
    );

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    req.query = data as any;

    next();
  };

  notifyStaleUpdateRequests: IMiddleware = (req, res, next) => {
    const { error, data } = validateNotifyStaleUpdateRequests.safeParse(
      req.body
    );

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    req.body = data;

    next();
  };
}
