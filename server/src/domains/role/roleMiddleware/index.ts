import { z } from "zod";
import { IMiddleware } from "../../../types/middleware";

export default class RoleMiddleware {
  createRole: IMiddleware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  updateRole: IMiddleware = (req, res, next) => {
    const validate = z.object({
      name: z.string().nonempty("Name is required"),
      description: z.string().nonempty("Description is required"),
    });

    const { error } = validate.safeParse(req.body);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  deleteRole: IMiddleware = (req, res, next) => {
    const validate = z.object({
      id: z.string().nonempty("ID is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };

  getRoleById: IMiddleware = (req, res, next) => {
    const validate = z.object({
      id: z.string().nonempty("ID is required"),
    });

    const { error } = validate.safeParse(req.params);

    if (error) {
      res.status(400).send({ error: error.errors });
      return;
    }

    next();
  };
}
