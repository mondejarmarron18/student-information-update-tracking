import { model, Schema, Types } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  name: string;
  description: string;
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
