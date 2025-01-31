import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";
import guardianSchema, { IGuardian } from "./guardianSchema";

export interface IAcadProfile {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  learnerReferenceNumber: string;
  yearLevelId: Types.ObjectId;
  courseId: Types.ObjectId;
  specializationId: Types.ObjectId;
  guardians: IGuardian[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const acadProfileSchema = new Schema<IAcadProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: [true, "User already exists"],
  },
  learnerReferenceNumber: {
    type: String,
    required: true,
    unique: [true, "Learner reference number already exists"],
  },
  yearLevelId: {
    type: Schema.Types.ObjectId,
    ref: schemaName.YEAR_LEVEL,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: schemaName.COURSE,
    required: true,
  },
  specializationId: {
    type: Schema.Types.ObjectId,
    ref: schemaName.SPECIALIZATION,
    required: true,
  },
  guardians: {
    type: [guardianSchema],
    required: true,
    min: 1,
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

const AcadProfileModel = model<IAcadProfile>(
  schemaName.ACAD_PROFILE,
  acadProfileSchema,
  schemaName.ACAD_PROFILE
);

export default AcadProfileModel;
