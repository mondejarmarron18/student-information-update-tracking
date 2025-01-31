import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export interface ISpecialization {
  _id: Types.ObjectId;
  creatorId: Types.ObjectId;
  updaterId: Types.ObjectId;
  courseId: Types.ObjectId;
  name: string;
  description: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const specializationSchema = new Schema<ISpecialization>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  updaterId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
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
  deletedAt: {
    type: Date,
    default: null,
  },
});

specializationSchema.index({ courseId: 1, name: 1 }, { unique: true });

const SpecializationModel = model<ISpecialization>(
  schemaName.SPECIALIZATION,
  specializationSchema,
  schemaName.SPECIALIZATION
);

export default SpecializationModel;
