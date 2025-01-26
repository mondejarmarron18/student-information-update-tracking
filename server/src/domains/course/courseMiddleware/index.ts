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

  createCourse: IMiddlware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
      details: z.string().optional(),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  updateCourse: IMiddlware = (req, res, next) => {
    const validate = z.object({
      courseId: z.string().nonempty("Course ID is required"),
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
      details: z.string().optional(),
    });

    const { error } = validate.safeParse({
      ...req.body,
      courseId: req.params.courseId,
    });

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  getCourseById: IMiddlware = (req, res, next) => {
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
