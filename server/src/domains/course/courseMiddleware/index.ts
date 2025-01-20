import { z } from "zod";
import { IMiddlware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class CourseMiddlewarre {
  getCourseSpecializations: IMiddlware = (req, res, next) => {
    const validate = z.object({
      courseId: z.string().nonempty("Course ID is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };
}
