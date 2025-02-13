import customErrors from "../constants/customErrors";
import { IMiddleware } from "../types/middleware";
import config from "../utils/config";
import CustomResponse from "../utils/CustomResponse";

const authIpAddress: IMiddleware = (req, res, next) => {
  const ip = req.ip?.replace(/^::ffff:/, "");

  if (!ip || !config.accessIps.includes(ip)) {
    return CustomResponse.sendError(res, customErrors.unauthorized);
  }

  next();
};

export default authIpAddress;
