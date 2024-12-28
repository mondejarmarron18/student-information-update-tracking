import { Schema, model } from "mongoose";

export interface IOtp {
  _id: string;
  otp: number;
  email: string;
  verifiedAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

const otpModel = new Schema<IOtp>({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verifiedAt: Date,
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IOtp>("otp", otpModel);
