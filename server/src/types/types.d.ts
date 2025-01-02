import { IUser } from "../domains/user/userModel";

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      user?: Omit<IUser, "password">;
    }
  }
}
