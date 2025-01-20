import { z } from "zod";
import customErrors from "../../../constants/customErrors";
import { IMiddlware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";

export default class YearLevelMiddleware {
  createYearLevel: IMiddlware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error)
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });

    next();
  };
}
