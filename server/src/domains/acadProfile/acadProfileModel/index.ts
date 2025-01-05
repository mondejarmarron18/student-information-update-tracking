import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";
import guardianSchema, { IGuardian } from "./guardianSchema";

export interface IAcadProfile {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  learnerReferenceNumber: string;
  yearLevel: number;
  course: string;
  specialization: string;
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
  yearLevel: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
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

acadProfileSchema.pre("save", function (next) {
  if (!this.isModified("deletedAt")) {
    this.updatedAt = new Date();
  }
  next();
});

const AcadProfileModel = model<IAcadProfile>(
  schemaName.ACAD_PROFILE,
  acadProfileSchema
);

export default AcadProfileModel;
