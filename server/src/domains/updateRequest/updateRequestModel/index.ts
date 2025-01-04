import { model, Schema, Types } from "mongoose";

import UserProfileModel, {
  IUserProfile,
} from "../../userProfile/userProfileModel";
import AcadProfileModel, {
  IAcadProfile,
} from "../../acadProfile/acadProfileModel";
import {
  UpdateRequestStatusValue,
  updateRequestStatusValues,
} from "../../../constants/updateRequestStatus";
import { schemaName, schemaNameValues } from "../../../constants/schemaName";

export type IUpdateRequest = {
  userId: Types.ObjectId;
  reviewedById: Types.ObjectId;
  reviewStatus: UpdateRequestStatusValue;
  reviewComment: string;
  reviewedAt: Date;
  requestedAt: Date;
} & (
  | {
      contentType: typeof schemaName.USER_PROFILE;
      content: {
        previous: IUserProfile;
        current: IUserProfile;
      };
    }
  | {
      contentType: typeof schemaName.ACAD_PROFILE;
      content: {
        previous: IAcadProfile;
        current: IAcadProfile;
      };
    }
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
      enum: schemaNameValues,
      required: true,
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

// Hooks
updateRequestSchema.pre("save", function (next) {
  if (!this.isNew && this.isModified("reviewStatus")) {
    this.reviewedAt = new Date();
  }

  next();
});

// Models
const UpdateRequestModel = model<IUpdateRequest>(
  schemaName.UPDATE_REQUEST,
  updateRequestSchema
);

// Discriminators
UpdateRequestModel.discriminator(
  schemaName.USER_PROFILE,
  new Schema({
    content: {
      previous: {
        type: UserProfileModel.schema,
        required: true,
      },
      current: {
        type: UserProfileModel.schema,
        required: true,
      },
    },
  })
);

UpdateRequestModel.discriminator(
  schemaName.ACAD_PROFILE,
  new Schema({
    content: {
      previous: {
        type: AcadProfileModel.schema,
        required: true,
      },
      current: {
        type: AcadProfileModel.schema,
        required: true,
      },
    },
  })
);

export default UpdateRequestModel;
