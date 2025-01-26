import { z } from "zod";
import { IMiddlware } from "../../../types/middleware";

export default class YearLevelMiddleware {
  createYearLevel: IMiddlware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().optional(),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  getYearLevelById: IMiddlware = (req, res, next) => {
    const validate = z.object({
      yearLevelId: z.string().nonempty("Year Level ID is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  updateYearLevel: IMiddlware = (req, res, next) => {
    const validate = z.object({
      yearLevelId: z.string().nonempty("Year Level ID is required"),
      name: z.string().nonempty("Name is required"),
      description: z.string().optional(),
    });

    const { error } = validate.safeParse({ ...req.body, ...req.params });

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };
}
