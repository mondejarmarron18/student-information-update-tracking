import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default class RoleMiddleware {
  createRole = (req: Request, res: Response, next: NextFunction) => {
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

  updateRole = (req: Request, res: Response, next: NextFunction) => {
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

  deleteRole = (req: Request, res: Response, next: NextFunction) => {
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

  getRoleById = (req: Request, res: Response, next: NextFunction) => {
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
