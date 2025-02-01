import { validateCreateUpdateRequest } from "./validationSchema";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class UpdateRequestMiddleware {
  static createUpdateRequest: IMiddleware = (req, res, next) => {
    const { error } = validateCreateUpdateRequest.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };
}
