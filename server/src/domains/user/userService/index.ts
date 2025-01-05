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
    const existingUser = await this.userRepository.getUserByEmail(params.email);
    let user = existingUser;

    // Check if user already exists
    if (!user) {
      const isRoleExist = await this.roleService.isRoleIdExist(params.roleId);

      if (!isRoleExist) throw new Error("Role not found");

      const newUser = await x8tAsync(this.userRepository.createUser(params));

      if (newUser.error) throw newUser.error;
      if (!newUser.result) throw new Error("User creation failed");

      user = newUser.result;
    }

    if (user?.verifiedAt) throw new Error("Email already exists");

    const verificationCode = await this.generateVerificationCode(user._id);

    await this.sendVerificationEmail(user.email, verificationCode);

    return user;
  };

  generateVerificationCode = async (userId: IVerificationCode["userId"]) => {
    const verificationCode = await x8tAsync(
      this.verificationCodeService.generateVerificationCode(userId)
    );

    if (verificationCode.error || !verificationCode.result?.id) {
      console.log("Verification code creation failed:", verificationCode.error);
      CustomError.internalServerError({
        details: verificationCode.error,
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
      html: await hbs("email", {
        verificationUrl: `${config.clientUrl}/verify-email/${verificationCode}`,
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
      console.log("Failed to send verification email:", sendMailError);
      CustomError.internalServerError({ details: sendMailError });
    }
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
    password: IUser["password"]
  ) => {
    const isUserExist = await this.userRepository.isUserIdExists(id);

    if (!isUserExist) {
      throw new Error("User not found");
    }

    return this.userRepository.updateUserPassword(id, password);
  };

  loginUser = async (params: Pick<IUser, "email" | "password">) => {
    const user = await this.userRepository.getUserByEmail(params.email);

    if (!user) {
      throw new Error("Email not found");
    }

    const isPasswordMatch = bcrypt.compareSync(params.password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    if (!user.verifiedAt) {
      const verificationCode = await this.generateVerificationCode(user._id);

      await this.sendVerificationEmail(user.email, verificationCode);

      CustomError.unverifiedAccount();
    }

    const userWithoutPassword = _.omit(user, "password");
    const token = generateToken(userWithoutPassword);
    const refreshToken = generateRefreshToken(userWithoutPassword);

    if (!token || !refreshToken) {
      CustomError.internalServerError();
    }

    return {
      token,
      refreshToken,
    };
  };

  verifyUser = async (id: IVerificationCode["_id"]): Promise<IUser> => {
    const verificationCode =
      await this.verificationCodeService.getValidVerificationCode(id);
    const isVerified = await x8tAsync(
      this.userRepository.isUserVerified(verificationCode.userId)
    );

    if (isVerified.error) throw isVerified.error;
    if (isVerified.result) {
      throw new Error("User is already verified");
    }

    const verifyUser = await x8tAsync(
      this.userRepository.verifyUser(verificationCode.userId)
    );

    if (verifyUser.error) throw verifyUser.error;
    if (!verifyUser.result) {
      throw new Error("User not found");
    }

    return verifyUser.result;
  };
}
