import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { IMiddleware } from "../../../types/middleware";
import { validateUserProfile } from "./validationSchema";

export default class UserProfileMiddleware {
  static createUserProfile: IMiddleware = (req, res, next) => {
    const { error } = validateUserProfile.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };
}
