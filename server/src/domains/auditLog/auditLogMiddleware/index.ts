import { z } from "zod";
import customErrors from "../../../constants/customErrors";
import { IMiddleware } from "../../../types/middleware";
import CustomResponse from "../../../utils/CustomResponse";

export default class AuditLogMiddleware {
  getAuditLogById: IMiddleware = (req, res, next) => {
    const validate = z.object({
      auditLogId: z.string().nonempty("Audit Log ID is required"),
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
