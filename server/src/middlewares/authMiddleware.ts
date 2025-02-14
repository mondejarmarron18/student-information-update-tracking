import { x8tSync } from "x8t";
import customErrors from "../constants/customErrors";
import { IMiddleware } from "../types/middleware";
import CustomResponse from "../utils/CustomResponse";
import {
  generateToken,
  getAccessToken,
  verifyRefreshToken,
  verifyToken,
} from "../utils/token";
import { TokenExpiredError } from "jsonwebtoken";

const authMiddleware: IMiddleware = (req, res, next) => {
  const token = getAccessToken(req);

  // Try to verify the access token
  const verifiedToken = x8tSync(() => verifyToken(token || ""));

  if (verifiedToken.error || !verifiedToken.result) {
    const isTokenExpired = verifiedToken.error instanceof TokenExpiredError;

    if (!isTokenExpired) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    // Try to verify the refresh token
    const verifiedRefreshToken = x8tSync(() =>
      verifyRefreshToken(refreshToken)
    );

    if (verifiedRefreshToken.error || !verifiedRefreshToken.result) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    res.locals.accessToken = generateToken(verifiedRefreshToken.result);
    req.user = verifiedRefreshToken.result;

    return next();
  }

  res.locals.accessToken = null;
  req.user = verifiedToken.result;

  next();
};

export default authMiddleware;
