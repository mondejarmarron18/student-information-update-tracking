import { Address } from "./address.type";

export type UserProfile = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    current: Address;
    permanent: Address;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
