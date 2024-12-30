import { model, Schema, Types } from "mongoose";
import contactMethods, {
  ContactMethodsValue,
} from "../userProfileConstant/contactMethods";

export interface IAddress {
  country: String;
  region: String;
  city: String;
  barangay: String;
  street: String;
}

export interface IUserProfile {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  firstName: String;
  middleName: String;
  lastName: String;
  nameExtension: String;
  phoneNumber: String;
  contactMethods: ContactMethodsValue[];
  address: {
    current: IAddress;
    permanent: IAddress;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const addressSchema = new Schema<IAddress>({
  country: String,
  region: String,
  city: String,
  barangay: String,
  street: String,
});

const userProfileSchema = new Schema<IUserProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  nameExtension: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  contactMethods: {
    type: [Number],
    unique: true,
  },
  address: {
    current: addressSchema,
    permanent: addressSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});

userProfileSchema.pre("save", function (next) {
  if (!this.isModified("deletedAt")) {
    this.updatedAt = new Date();
  }

  next();
});

const UserProfileModel = model<IUserProfile>("userProfile", userProfileSchema);

export default UserProfileModel;
