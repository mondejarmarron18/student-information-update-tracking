import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export interface ICourse {
  _id: Types.ObjectId;
  name: string;
  description: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    unique: [true, "Course name already exists"],
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
  deletedAt: {
    type: Date,
  },
});

const courseModel = model<ICourse>(schemaName.COURSE, courseSchema);

export default courseModel;
