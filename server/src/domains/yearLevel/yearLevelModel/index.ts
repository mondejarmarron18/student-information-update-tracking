import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export type YearLevel = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  creatorId: Types.ObjectId;
  updaterId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

const yearLevelSchema = new Schema<YearLevel>({
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
    unique: [true, "Year level already exists"],
  },
  description: {
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
  deletedAt: Date,
});

const yearLevelModel = model<YearLevel>(schemaName.YEAR_LEVEL, yearLevelSchema);

export default yearLevelModel;
