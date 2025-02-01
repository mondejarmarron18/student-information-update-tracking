import { Role } from "./role.type";
import { UserProfile } from "./userProfile.type";

export type UserAccount = {
  _id: string;
  roleId?: Role;
  userProfileId: string;
  role?: Role;
  profile?: UserProfile;
  email: string;
  password: string;
  verifiedAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
