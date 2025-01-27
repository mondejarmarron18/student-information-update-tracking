import { model, Schema } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

type Discussion = {
  _id: string;
  topic: string;
  description: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
};

const discussionSchema = new Schema<Discussion>({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
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

const DiscussionModel = model(schemaName.DISCUSSION, discussionSchema);

export default DiscussionModel;
