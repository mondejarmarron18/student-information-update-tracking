import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { IMiddlware } from "../../../types/middleware";
import { validateUserProfile } from "./validationSchema";

export default class UserProfileMiddleware {
  static createUserProfile: IMiddlware = (req, res, next) => {
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
