import { Schema } from "mongoose";

export interface IGuardian {
  firstName: string;
  middleName: string;
  lastName: string;
  nameExtension: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

const guardianSchema = new Schema<IGuardian>(
  {
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
    relationship: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export default guardianSchema;
