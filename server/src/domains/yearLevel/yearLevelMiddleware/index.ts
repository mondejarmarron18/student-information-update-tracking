import { z } from "zod";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class YearLevelMiddleware {
  createYearLevel: IMiddleware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().optional(),
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

  getYearLevelById: IMiddleware = (req, res, next) => {
    const validate = z.object({
      yearLevelId: z.string().nonempty("Year Level ID is required"),
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

  updateYearLevel: IMiddleware = (req, res, next) => {
    const validate = z.object({
      yearLevelId: z.string().nonempty("Year Level ID is required"),
      name: z.string().nonempty("Name is required"),
      description: z.string().optional(),
    });

    const { error } = validate.safeParse({ ...req.body, ...req.params });

    if (error) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        details: error.errors,
      });
    }

    next();
  };

  deleteYearLevelById: IMiddleware = (req, res, next) => {
    const validate = z.object({
      yearLevelId: z.string().nonempty("Year Level ID is required"),
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
