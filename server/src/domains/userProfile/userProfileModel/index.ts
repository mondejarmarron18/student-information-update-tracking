import { model, Schema, Types } from "mongoose";
import {
  contactMethodsValue,
  ContactMethodsValue,
} from "../../../constants/contactMethods";
import { schemaName } from "../../../constants/schemaName";

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
  dateOfBirth: Date;
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

export const addressSchema = new Schema<IAddress>(
  {
    country: String,
    region: String,
    city: String,
    barangay: String,
    street: String,
  },
  {
    _id: false,
  }
);

const userProfileSchema = new Schema<IUserProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  contactMethods: {
    type: [Number],
    enum: contactMethodsValue,
    validate: {
      validator: (cms: ContactMethodsValue[]) => {
        return cms.every((cm) => contactMethodsValue.includes(cm));
      },
      message: "Invalid contact method",
    },
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

const UserProfileModel = model<IUserProfile>(
  schemaName.USER_PROFILE,
  userProfileSchema
);

export default UserProfileModel;
