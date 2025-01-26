import { Schema } from "mongoose";
import { IAcadProfile } from "../../acadProfile/acadProfileModel";
import guardianSchema from "../../acadProfile/acadProfileModel/guardianSchema";
import {
  addressSchema,
  IUserProfile,
} from "../../userProfile/userProfileModel";
import {
  contactMethodsValue,
  ContactMethodsValue,
} from "../../../constants/contactMethods";
import { schemaName } from "../../../constants/schemaName";

const acadProfileContent = new Schema<IAcadProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    learnerReferenceNumber: {
      type: String,
      required: true,
    },
    yearLevel: {
      type: Number,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: schemaName.COURSE,
      required: true,
    },
    specializationId: {
      type: Schema.Types.ObjectId,
      ref: schemaName.SPECIALIZATION,
      required: true,
    },
    guardians: {
      type: [guardianSchema],
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

export const acadProfileContentSchema = new Schema(
  {
    content: {
      previous: acadProfileContent,
      current: acadProfileContent,
    },
  },
  {
    _id: false,
  }
);

const userProfileContent = new Schema<IUserProfile>(
  {
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
  },
  {
    _id: false,
  }
);

export const userProfileContentSchema = new Schema(
  {
    content: {
      previous: userProfileContent,
      current: userProfileContent,
    },
  },
  {
    _id: false,
  }
);
