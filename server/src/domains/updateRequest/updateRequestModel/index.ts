import { model, Schema, Types } from "mongoose";
import { IUserProfile } from "../../userProfile/userProfileModel";
import { IAcadProfile } from "../../acadProfile/acadProfileModel";
import {
  updateRequestContentType,
  updateRequestContentTypeValues,
  UpdateRequestStatusValue,
  updateRequestStatusValues,
} from "../../../constants/updateRequest";
import { schemaName } from "../../../constants/schemaName";
import {
  acadProfileContentSchema,
  userProfileContentSchema,
} from "./updateRequestContentSchema";

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
  updatedAt: Date;
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
      validate: {
        validator: function (val: Types.ObjectId) {
          return val.toString() !== this.requesterId.toString();
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

// Models
const UpdateRequestModel = model<IUpdateRequest>(
  schemaName.UPDATE_REQUEST,
  updateRequestSchema,
  schemaName.UPDATE_REQUEST
);

// Discriminators
UpdateRequestModel.discriminator(
  updateRequestContentType.USER_PROFILE,
  userProfileContentSchema,
  updateRequestContentType.USER_PROFILE
);

UpdateRequestModel.discriminator(
  updateRequestContentType.ACAD_PROFILE,
  acadProfileContentSchema,
  updateRequestContentType.ACAD_PROFILE
);

export default UpdateRequestModel;
