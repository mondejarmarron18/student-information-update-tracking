import { model, Schema, Types } from "mongoose";
import { UserRoles, userRolesValues } from "../../../constants/userRoles";

export interface IRole {
  _id: Types.ObjectId;
  name: UserRoles;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    enum: userRolesValues,
    validate: {
      validator: (value: string) => {
        return userRolesValues.includes(value as UserRoles);
      },
      message: `Invalid role: ${userRolesValues.join(", ")}`,
    },
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
