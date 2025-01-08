import jwt from "jsonwebtoken";
import config from "./config";
import { Request } from "express";

export const generateToken = (data: Request["user"]): string => {
  const { exp, iat, nbf, ...plainData } = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.secret as string, {
    expiresIn: config.jwt.secretExpiresIn,
  });
};

export const verifyToken = (token: string): Request["user"] | null => {
  return jwt.verify(token, config.jwt.secret as string) as Request["user"];
};

export const generateRefreshToken = (data: Request["user"]): string => {
  const { exp, iat, nbf, ...plainData } = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.refreshSecret as string, {
    expiresIn: config.jwt.refreshSecretExpiresIn,
  });
};

export const verifyRefreshToken = (token: string): Request["user"] | null => {
  return jwt.verify(
    token,
    config.jwt.refreshSecret as string
  ) as Request["user"];
};

export const getAccessToken = (req: Request) => {
  return req.headers.authorization?.replace("Bearer", "").trim();
};
