import { NextFunction, Request, Response } from "express";
import userRoles from "../constants/userRoles";
import CustomResponse from "../utils/CustomResponse";
import customErrors from "../constants/customErrors";
import { IMiddleware } from "../types/middleware";

type AllowedRole = (typeof userRoles)[keyof typeof userRoles];

const authRole = () => {
  // Use closure to store the allowed roles
  let allowedRoles = new Set<AllowedRole>();

  return {
    isAdmin() {
      allowedRoles.add(userRoles.ADMIN);
      return this; // Return the object to enable chaining
    },

    isStaff() {
      allowedRoles.add(userRoles.STAFF);
      return this;
    },

    isStudent() {
      allowedRoles.add(userRoles.STUDENT);
      return this;
    },

    // Use closure for `allowedRoles` inside apply
    apply(req: Request, res: Response, next: NextFunction) {
      const role = req.user?.roleId.name;

      if (role && allowedRoles.has(role as AllowedRole)) {
        return next();
      }

      return CustomResponse.sendError(res, {
        ...customErrors.forbidden,
        details: "You do not have permission to access this resource.",
      });
    },
  };
};

export default authRole;
