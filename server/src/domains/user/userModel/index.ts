import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { schemaName } from "../../../constants/schemaName";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roleId: Types.ObjectId;
  loginAttempt: number;
  verifiedAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "role",
    required: true,
  },
  loginAttempt: {
    type: Number,
    default: 0,
  },
  verifiedAt: Date,
  deletedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  if (!this.isModified("deletedAt") || !this.isModified("verifiedAt")) {
    this.updatedAt = new Date();
  }

  next();
});

const UserModel = model<IUser>(schemaName.USER, userSchema);

export default UserModel;
