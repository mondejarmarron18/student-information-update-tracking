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
import updateRequestContentSchema from "./updateRequesContentSchema";

export type IUpdateRequestContent<ContentType, Content> = {
  contentType: ContentType;
  content: {
    previous: Content;
    current: Content;
  };
};

export type IUpdateRequest = {
  userId: Types.ObjectId;
  reviewedById: Types.ObjectId;
  reviewStatus: UpdateRequestStatusValue;
  reviewComment: string;
  reviewedAt: Date;
  requestedAt: Date;
} & (
  | IUpdateRequestContent<typeof schemaName.USER_PROFILE, IAcadProfile>
  | IUpdateRequestContent<typeof schemaName.ACAD_PROFILE, IUserProfile>
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
  updateRequestContentSchema(UserProfileModel.schema)
);

UpdateRequestModel.discriminator(
  schemaName.ACAD_PROFILE,
  updateRequestContentSchema(AcadProfileModel.schema)
);

export default UpdateRequestModel;
