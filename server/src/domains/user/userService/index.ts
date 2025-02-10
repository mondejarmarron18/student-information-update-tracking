import { x8tAsync } from "x8t";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../../../utils/token";
import RoleService from "../../role/roleService";
import { IUser } from "../userModel";
import UserRepository from "../userRepository";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/email";
import config from "../../../utils/config";
import hbs from "../../../utils/hbs";
import _ from "lodash";
import { IVerificationCode } from "../../verificationCode/verificationCodeModel";
import VerificationCodeService from "../../verificationCode/verificationCodeService";
import CustomError from "../../../utils/CustomError";
import { Request } from "express";
import { passwordCompare } from "../../../utils/password";

export default class UserService {
  userRepository: UserRepository;
  roleService: RoleService;
  verificationCodeService: VerificationCodeService;

  constructor() {
    this.userRepository = new UserRepository();
    this.roleService = new RoleService();
    this.verificationCodeService = new VerificationCodeService();
  }

  createUser = async (params: Pick<IUser, "email" | "password" | "roleId">) => {
    const isUserEmailExists = await this.userRepository.isUserEmailExists(
      params.email
    );

    if (isUserEmailExists) {
      return CustomError.badRequest({ description: "Email already exists" });
    }

    const isRoleExist = await this.roleService.isRoleIdExist(params.roleId);

    if (!isRoleExist) {
      return CustomError.notFound({ description: "Role not found" });
    }

    const { result: user, error } = await x8tAsync(
      this.userRepository.createUser(params)
    );

    if (error || !user) {
      return CustomError.internalServerError({
        details: error || "Failed to create user",
      });
    }

    const verificationCode = await this.generateVerificationCode(user._id);

    //Include password in email if the account is created by admin or super admin
    await this.sendVerificationEmail(user.email, verificationCode);

    return _.omit(user.toJSON(), "password");
  };

  createStudent = async (params: Pick<IUser, "email" | "password">) => {
    const role = await this.roleService.getRoleByName("student");

    if (!role) return CustomError.notFound({ details: "Role not found" });

    return this.createUser({ ...params, roleId: role._id });
  };

  generateVerificationCode = async (userId: IVerificationCode["userId"]) => {
    const verificationCode = await x8tAsync(
      this.verificationCodeService.generateVerificationCode(userId)
    );

    if (verificationCode.error || !verificationCode.result?.id) {
      CustomError.internalServerError({
        details:
          verificationCode.error || "Failed to generate verification code",
      });
    }

    return verificationCode.result!._id;
  };

  sendVerificationEmail = async (
    email: IUser["email"],
    verificationCode: IVerificationCode["_id"]
  ) => {
    const { error: sendMailError } = await sendMail({
      to: email,
      subject: "Account Verification",
      html: await hbs("emailVerification", {
        verificationUrl: `${config.clientUrl}/email-verification/${verificationCode}`,
        supportEmail: config.smtp.sender,
        appName: config.appName,
        expireIn: "24 hours",
        website: {
          domain: config.clientUrl?.replace(/(http|https):\/\//, ""),
          url: config.clientUrl,
        },
      }),
    });

    if (sendMailError) {
      console.log("Failed to send verification email:", sendMailError);
      return CustomError.internalServerError({ details: sendMailError });
    }

    console.log("Verification code sent to:", email);
  };

  getUserByEmail = (email: IUser["email"]) => {
    return this.userRepository.getUserByEmail(email);
  };

  getUserById = (id: IUser["_id"]) => {
    return this.userRepository.getUserById(id);
  };

  getUsers = () => {
    return this.userRepository.getUsers();
  };

  isUserExists = (email: IUser["email"]) => {
    return this.userRepository.getUserByEmail(email);
  };

  isUserIdExists = (id: IUser["_id"]) => {
    return this.userRepository.getUserById(id);
  };

  deleteUser = (id: IUser["_id"]) => {
    return this.userRepository.deleteUser(id);
  };

  updateUserPassword = async (
    id: IUser["_id"],
    currentPassword: IUser["password"],
    newPassword: IUser["password"]
  ) => {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      return CustomError.notFound({ description: "User not found" });
    }

    const isPasswordMatch = bcrypt.compareSync(currentPassword, user.password);

    if (!isPasswordMatch) {
      return CustomError.badRequest({
        description: "Current password is incorrect",
      });
    }

    return this.userRepository.updateUserPassword(id, newPassword);
  };

  loginUser = async (params: Pick<IUser, "email" | "password">) => {
    const user = await this.userRepository
      .getUserByEmail(params.email)
      .populate("roleId");

    if (!user) {
      return CustomError.unauthorized({
        description: "Email is not registered",
      });
    }

    const isPasswordMatch = passwordCompare(params.password, user.password);

    if (!isPasswordMatch) {
      return CustomError.unauthorized({
        description: "Invalid email or password",
      });
    }

    if (!user.verifiedAt) {
      const verificationCode = await this.generateVerificationCode(user._id);

      await this.sendVerificationEmail(user.email, verificationCode);

      CustomError.unverifiedAccount();
    }

    const userWithoutPassword = _.omit(
      user.toJSON(),
      "password"
    ) as unknown as Request["user"];

    const token = generateToken(userWithoutPassword);
    const refreshToken = generateRefreshToken(userWithoutPassword);

    if (!token || !refreshToken) {
      CustomError.internalServerError();
    }

    return {
      token,
      refreshToken,
      user,
    };
  };

  verifyUser = async (id: IVerificationCode["_id"]) => {
    const verificationCode =
      await this.verificationCodeService.getValidVerificationCode(id);

    if (!verificationCode?.userId) {
      return CustomError.notFound({
        description: "Verification code not found",
      });
    }
    const isVerified = await x8tAsync(
      this.userRepository.isUserVerified(verificationCode.userId)
    );

    if (isVerified.error) throw isVerified.error;

    if (isVerified.result)
      CustomError.alreadyExists({
        description: "User is already verified",
      });

    const verifyUser = await x8tAsync(
      this.userRepository.verifyUser(verificationCode.userId)
    );

    if (verifyUser.error || !verifyUser.result) {
      return CustomError.internalServerError({
        details: verifyUser.error || "Failed to verify user",
      });
    }

    await this.verificationCodeService.invalidateVerificationCode(
      verificationCode.id
    );

    return verifyUser.result;
  };

  sendPasswordResetEmail = async (email: IUser["email"]) => {
    const user = await this.userRepository.getUserByEmail(email).select("_id");

    if (!user) {
      return CustomError.notFound({ description: "Email does not exist" });
    }

    const verificationCode = await this.generateVerificationCode(user._id);

    const { error: sendMailError } = await sendMail({
      to: email,
      subject: "Forgot Password - Reset Your Password",
      html: await hbs("passwordReset", {
        resetLink: `${config.clientUrl}/password-reset/${verificationCode}`,
        supportEmail: config.smtp.sender,
        appName: config.appName,
        unsubscribeUrl: `${config.clientUrl}/unsubscribe/${verificationCode}`,
        expireIn: "24 hours",
        website: {
          domain: config.clientUrl?.replace(/(http|https):\/\//, ""),
          url: config.clientUrl,
        },
      }),
    });

    if (sendMailError) {
      return CustomError.internalServerError({ details: sendMailError });
    }

    return user;
  };

  resetPassword = async (
    params: Pick<IUser, "password"> & {
      verificationCode: IVerificationCode["_id"];
    }
  ) => {
    const verificationCode =
      await this.verificationCodeService.getValidVerificationCode(
        params.verificationCode
      );

    if (!verificationCode) {
      return CustomError.notFound({
        description: "Verification code not found",
      });
    }

    const user = this.userRepository.updateUserPassword(
      verificationCode.userId,
      params.password
    );

    if (!user) {
      return CustomError.internalServerError({
        details: "Failed to reset password",
      });
    }

    await this.verificationCodeService.invalidateVerificationCode(
      params.verificationCode
    );

    return user;
  };
}
