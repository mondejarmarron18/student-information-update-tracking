import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export interface ISpecialization {
  _id: Types.ObjectId;
  name: string;
  description: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const specializationSchema = new Schema<ISpecialization>({
  name: {
    type: String,
    unique: [true, "Specialization with this name already exists"],
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

const SpecializationModel = model<ISpecialization>(
  schemaName.SPECIALIZATION,
  specializationSchema
);

export default SpecializationModel;
