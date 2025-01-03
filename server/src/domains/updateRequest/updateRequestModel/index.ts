import { model, Schema, Types } from "mongoose";
import {
  UpdateRequestStatusValue,
  updateRequestStatusValues,
} from "../../../constants/updateRequestStatus";
import UserProfileModel, {
  IUserProfile,
} from "../../userProfile/userProfileModel";
import AcadProfileModel, {
  IAcadProfile,
} from "../../acadProfile/acadProfileModel";

const contentTypes = ["userPrfile", "acadProfile"] as const;

export type IUpdateRequest = {
  userId: Types.ObjectId;
  reviewedById: Types.ObjectId;
  reviewStatus: UpdateRequestStatusValue;
  reviewComment: string;
  reviewedAt: Date;
  requestedAt: Date;
} & (
  | { contentType: "userProfile"; content: IUserProfile }
  | { contentType: "acadProfile"; content: IAcadProfile }
);

const updateRequestSchema = new Schema<IUpdateRequest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviewedById: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviewStatus: {
      type: Number,
      enum: updateRequestStatusValues,
      required: true,
      default: 1,
    },
    reviewComment: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    content: {
      previous: {
        type: Schema.Types.Mixed,
        required: true,
      },
      current: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    discriminatorKey: "contentType",
  }
);

updateRequestSchema.discriminator("userProfile", UserProfileModel.schema);
updateRequestSchema.discriminator("acadProfile", AcadProfileModel.schema);

updateRequestSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("reviewStatus")) {
    this.reviewedAt = new Date();
  }

  next();
});

const UpdateRequestModel = model<IUpdateRequest>(
  "updateRequest",
  updateRequestSchema
);

export default UpdateRequestModel;
