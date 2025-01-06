import { model, Schema, Types } from "mongoose";
import UserProfileModel, {
  IUserProfile,
} from "../../userProfile/userProfileModel";
import AcadProfileModel, {
  IAcadProfile,
} from "../../acadProfile/acadProfileModel";
import {
  updateRequestContentType,
  updateRequestContentTypeValues,
  UpdateRequestStatusValue,
  updateRequestStatusValues,
} from "../../../constants/updateRequest";
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
  _id: Types.ObjectId;
  requesterId: Types.ObjectId;
  reviewerId: Types.ObjectId;
  reviewStatus: UpdateRequestStatusValue;
  reviewComment: string;
  reviewedAt: Date;
  requestedAt: Date;
} & (
  | IUpdateRequestContent<
      typeof updateRequestContentType.ACAD_PROFILE,
      IAcadProfile
    >
  | IUpdateRequestContent<
      typeof updateRequestContentType.USER_PROFILE,
      IUserProfile
    >
);

const updateRequestSchema = new Schema<IUpdateRequest>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      validate: {
        validator: function (value) {
          return value !== this.requesterId;
        },
        message: "Reviewer cannot be the same as requester",
      },
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
      enum: updateRequestContentTypeValues,
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
  updateRequestContentType.USER_PROFILE,
  updateRequestContentSchema(UserProfileModel.schema)
);

UpdateRequestModel.discriminator(
  updateRequestContentType.ACAD_PROFILE,
  updateRequestContentSchema(AcadProfileModel.schema)
);

export default UpdateRequestModel;
