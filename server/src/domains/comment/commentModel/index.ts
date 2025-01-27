import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

const entityTypes = [schemaName.ANNOUNCEMENT, schemaName.DISCUSSION] as const;

type Comment = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  entityType: (typeof entityTypes)[number];
  entityId: Types.ObjectId;
  commentId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const commentSchema = new Schema<Comment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  entityType: {
    type: String,
    enum: entityTypes,
    required: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  commentId: {
    // For nested comments
    type: Schema.Types.ObjectId,
    ref: schemaName.COMMENT,
    default: null,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = model(schemaName.COMMENT, commentSchema);

export default CommentModel;
