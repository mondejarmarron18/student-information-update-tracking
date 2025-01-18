export type UserAccount = {
  id: string;
  roleId: {
    _id: string;
    name: string;
    description: string;
  };
  userProfileId: string;
  email: string;
  password: string;
  verifiedAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
