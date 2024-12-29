import { x8tAsync } from "x8t";
import { generateToken } from "../../../utils/token";
import RoleService from "../../role/roleService";
import { IUser } from "../userModel";
import UserRepository from "../userRepository";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/email";
import config from "../../../utils/config";
import hbs from "../../../utils/hbs";
import _, { result } from "lodash";
import { IVerificationCode } from "../../verificationCode/verificationCodeModel";
import VerificationCodeService from "../../verificationCode/verificationCodeService";

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

    const verificationCode = await x8tAsync(
      this.verificationCodeService.generateVerificationCode(user._id)
    );

    if (verificationCode.error || !verificationCode.result) {
      console.log("Verification code creation failed:", verificationCode.error);
      throw new Error("Verification code creation failed");
    }

    const { _id: verificationCodeId } = verificationCode.result;

    await this.sendVerificationEmail({ email: user.email }, verificationCodeId);

    return user;
  };

  sendVerificationEmail = async (
    params: Pick<IUser, "email">,
    verificationCode: IVerificationCode["_id"]
  ) => {
    const { error: sendMailError } = await sendMail({
      to: params.email,
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

    if (sendMailError !== null) {
      console.log("Failed to send verification email:", sendMailError);
      throw new Error("Failed to send verification email");
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
      throw new Error("User is not verified");
    }

    const token = generateToken(user);

    if (!token) {
      throw new Error("Failed to generate token");
    }

    return token;
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

    console.log({ verifyUser });

    return verifyUser.result;
  };
}
