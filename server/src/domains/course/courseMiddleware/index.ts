import { z } from "zod";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class CourseMiddlewarre {
  getCourseSpecializations: IMiddleware = (req, res, next) => {
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

  createCourse: IMiddleware = (req, res, next) => {
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

  updateCourse: IMiddleware = (req, res, next) => {
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

  getCourseById: IMiddleware = (req, res, next) => {
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
