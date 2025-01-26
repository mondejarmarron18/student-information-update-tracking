import { z } from "zod";
import customErrors from "../../../constants/customErrors";
import { IMiddlware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";

export default class SpecializationMiddleware {
  getSpecializations: IMiddlware = (req, res, next) => {
    const validateQueryParams = z.object({
      courseId: z.string().optional(),
    });

    const { error } = validateQueryParams.safeParse(req.query);

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  getSpecializationsByCourseId: IMiddlware = async (req, res, next) => {
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

  createSpecialization: IMiddlware = (req, res, next) => {
    const validate = z.object({
      courseId: z.string().nonempty("Course ID is required"),
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
      details: z.string().optional(),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      console.log(error);
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  updateSpecialization: IMiddlware = (req, res, next) => {
    const validate = z.object({
      specializationId: z.string().nonempty("Specialization ID is required"),
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
      details: z.string().optional(),
    });

    const { error } = validate.safeParse({
      ...req.body,
      specializationId: req.params.specializationId,
    });

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  getSpecializationById: IMiddlware = (req, res, next) => {
    const validate = z.object({
      specializationId: z.string().nonempty("Specialization ID is required"),
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
