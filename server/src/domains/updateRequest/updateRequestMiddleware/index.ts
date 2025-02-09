import {
  validateCreateUpdateRequest,
  validateGetUpdateRequestsPassedDays,
  validateGetUpdateRequestsPassedMonths,
} from "./validationSchema";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

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
    const { error } = validateGetUpdateRequestsPassedMonths.safeParse(
      req.query
    );

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };
}
