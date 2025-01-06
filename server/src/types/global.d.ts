import { IUser } from "../domains/user/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, "password">;
    }
  }
}
