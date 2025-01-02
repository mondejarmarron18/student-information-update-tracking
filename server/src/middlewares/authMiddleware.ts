import customErrors from "../constants/customErrors";
import { IMiddlware } from "../types/middleware";
import CustomResponse from "../utils/CustomResponse";
import { generateToken, verifyRefreshToken, verifyToken } from "../utils/token";

const authMiddleware: IMiddlware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return CustomResponse.sendError(res, customErrors.unauthorized);
  }

  // Try to verify the access token
  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    // If access token is invalid, check for a valid refresh token
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    // Verify refresh token
    const verifiedRefreshToken = verifyRefreshToken(refreshToken);

    if (!verifiedRefreshToken) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    // Generate a new access token using the refresh token's verified data
    const newAccessToken = generateToken(verifiedRefreshToken);

    if (!newAccessToken) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    // Attach the new access token and user info to the request
    req.user = verifiedRefreshToken;
    req.accessToken = newAccessToken;

    return next();
  }

  // If access token is valid, just attach the user info to the request
  req.user = verifiedToken;

  next();
};

export default authMiddleware;
