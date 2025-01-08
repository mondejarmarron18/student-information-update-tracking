import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";

export const role = {
  admin: "admin",
  user: "user",
  staff: "staff",
} as const;

export type role = (typeof role)[keyof typeof role];

// * = all
const hasRole = (roles: role[] | "*") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.roleId.name as role;

    if (roles !== "*" || !roles.includes(userRole)) {
      return next(CustomError.unauthorized());
    }

    next();
  };
};

export default hasRole;
