import jwt from "jsonwebtoken";
import { IUser } from "../domains/user/userModel";
import config from "./config";
import { x8tSync } from "x8t";

export const generateToken = (data: IUser): string => {
  const plainData = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.secret as string, {
    expiresIn: config.jwt.secretExpiresIn,
  });
};

export const verifyToken = (token: string): Partial<IUser> => {
  return jwt.verify(token, config.jwt.secret as string) as IUser;
};

export const generateRefreshToken = (data: IUser): string => {
  const plainData = JSON.parse(JSON.stringify(data));

  return jwt.sign(plainData, config.jwt.refreshSecret as string, {
    expiresIn: config.jwt.refreshSecretExpiresIn,
  });
};

export const verifyRefreshToken = (token: string): Partial<IUser> => {
  return jwt.verify(token, config.jwt.refreshSecret as string) as IUser;
};
