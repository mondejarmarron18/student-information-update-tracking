import { model, Schema, Types } from "mongoose";
import { IUser } from "../../user/userModel";

export interface IVerificationCode {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  invalidatedAt: Date; //When the code was invalidated due to new request
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  },
  invalidatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

verificationCodeSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Invalidate previous codes before creating a new one
    // This is to ensure that only one code can be used at a time for a given email within 24 hours
    const isVerified = await model<IUser>("user").exists({
      _id: this.userId,
      verifiedAt: { $ne: null },
    });

    if (isVerified) {
      throw new Error("User is already verified");
    }

    await model<IVerificationCode>("verificationCode").findOneAndUpdate(
      {
        userId: this.userId,
        invalidatedAt: null,
        expiresAt: { $gt: new Date() },
      },
      { $set: { invalidatedAt: new Date() } },
      { new: false }
    );
  }

  next();
});

export default model<IVerificationCode>(
  "verificationCode",
  verificationCodeSchema
);
