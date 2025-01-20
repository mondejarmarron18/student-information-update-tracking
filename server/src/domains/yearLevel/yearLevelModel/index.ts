import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export interface IYearLevel {
  _id: Types.ObjectId;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const yearLevelSchema = new Schema<IYearLevel>({
  name: {
    type: String,
    unique: [true, "Year level with this name already exists"],
    required: true,
  },
  description: {
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
  deletedAt: {
    type: Date,
  },
});

const YearLevelModel = model<IYearLevel>(
  schemaName.YEAR_LEVEL,
  yearLevelSchema
);

export default YearLevelModel;
