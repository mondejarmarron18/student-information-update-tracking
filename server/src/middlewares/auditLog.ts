import { IMiddleware } from "../types/middleware";

const auditLog: IMiddleware = (req, res, next) => {
  const requestedUrl = req.originalUrl.split("?")[0];
  const requestedFilter = req.query;
  const ipAddress = req.ip?.replace(/^::ffff:/, "") || "unknwown";
  const userAgent = req.headers["user-agent"] || "unknown";

  req.auditLog = {
    requestedUrl,
    requestedFilter,
    ipAddress,
    userAgent,
  };

  next();
};

export default auditLog;
