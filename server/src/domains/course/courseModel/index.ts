import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export interface ICourse {
  _id: Types.ObjectId;
  name: string;
  description: string;
  specializationIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    unique: [true, "Specialization with this name already exists"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specializationIds: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "specialization",
      },
    ],
    default: [],
    validate: {
      validator: function (value) {
        return (
          Array.isArray(value) &&
          new Set(value.map(String)).size === value.length
        );
      },
      message: "Specialization must not have duplicates",
    },
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
