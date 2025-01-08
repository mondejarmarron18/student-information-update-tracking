import { model, Schema, Types } from "mongoose";
import CustomError from "../../../utils/CustomError";

export interface IRole {
  _id: Types.ObjectId;
  name: string;
  description: string;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;
}

export const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: [true, "Role already exists"],
  },
  description: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number, //The lower the number, the higher the access level
    required: true,
    min: [1, "Access level must not be less than 1"],
    unique: [true, "Access level already exists"],
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

roleSchema.pre("save", function (next) {
  if (!this.isModified("deletedAt")) {
    this.updatedAt = new Date();
  }

  next();
});

const RoleModel = model<IRole>("role", roleSchema);

export default RoleModel;
