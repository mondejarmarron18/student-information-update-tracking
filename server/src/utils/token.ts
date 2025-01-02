import jwt from "jsonwebtoken";
import { IUser } from "../domains/user/userModel";
import config from "./config";

export const generateToken = (data: Omit<IUser, "password">): string => {
  const plainData = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.secret as string, {
    expiresIn: config.jwt.secretExpiresIn,
  });
};

export const verifyToken = (token: string): Omit<IUser, "password"> | null => {
  return jwt.verify(token, config.jwt.secret as string) as IUser;
};

export const generateRefreshToken = (data: Omit<IUser, "password">): string => {
  const plainData = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.refreshSecret as string, {
    expiresIn: config.jwt.refreshSecretExpiresIn,
  });
};

export const verifyRefreshToken = (
  token: string
): Omit<IUser, "password"> | null => {
  return jwt.verify(token, config.jwt.refreshSecret as string) as IUser;
};
