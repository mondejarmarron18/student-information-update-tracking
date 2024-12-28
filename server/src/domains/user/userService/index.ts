import { x8tAsync, x8tSync } from "x8t";
import {
  generateToken,
  generateVerificationToken,
  verifyVerificationToken,
} from "../../../utils/token";
import RoleService from "../../role/roleService";
import { IUser } from "../userModel";
import UserRepository from "../userRepository";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/email";
import config from "../../../utils/config";
import { formatJwtExpires } from "../../../utils";

export default class UserService {
  userRepository: UserRepository;
  roleService: RoleService;

  constructor() {
    this.userRepository = new UserRepository();
    this.roleService = new RoleService();
  }

  createUser = async (params: Pick<IUser, "email" | "password" | "roleId">) => {
    const isEmailExist = await this.userRepository.isUserEmailExists(
      params.email
    );

    if (isEmailExist) {
      throw new Error("Email already exist");
    }

    const isRoleExist = await this.roleService.isRoleIdExist(params.roleId);

    if (!isRoleExist) {
      throw new Error("Role not found");
    }

    const { result, error } = await x8tAsync(
      this.userRepository.createUser(params)
    );

    if (error !== null) {
      throw error;
    }

    if (!result) {
      throw new Error("User creation failed");
    }

    const verificationToken = generateVerificationToken(result);

    const { error: sendMailError } = await sendMail({
      to: params.email,
      subject: "Account Verification",
      html: `
        <p>Hi there,</p>

    <p>Thank you for signing up for <strong>${
      config.appName
    }</strong>! We're excited to have you on board.</p>

    <p>To complete your registration and activate your account, please verify your email address by clicking the link below:</p>

    <p><a href="${
      config.clientUrl
    }/verify-email/${verificationToken}">Verify Your Email</a></p>

    <p>If you didn’t sign up for <strong>${
      config.appName
    }</strong>, please ignore this email. If you have any questions or concerns, feel free to reach out to us at <a href="mailto:[Support Email]">Support Team</a>.</p>

    <p><em>Note:</em> This link will expire in ${formatJwtExpires(
      config.jwt.verificationSecretExpiresIn as string
    )}, so make sure to verify your email as soon as possible.</p>

    <hr />

    <p>Best regards,</p>
    <p>The <strong>${config.appName}</strong> Team</p>
    <p><a href="${config.clientUrl}">${config.clientUrl?.replace(
        /(http|https):\/\//,
        ""
      )}</a></p>

    <p><small>You are receiving this email because you signed up for <strong>${
      config.appName
    }</strong>. If you no longer wish to receive emails from us, please <a href="${
        config.clientUrl
      }/unsubscribe">unsubscribe</a>.</small></p>
      `,
    });

    if (sendMailError !== null) {
      throw new Error("Failed to send verification email");
    }

    return result;
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

  isUserExist = (email: IUser["email"]) => {
    return this.userRepository.getUserByEmail(email);
  };

  isUserIdExist = (id: IUser["_id"]) => {
    return this.userRepository.getUserById(id);
  };

  deleteUser = (id: IUser["_id"]) => {
    return this.userRepository.deleteUser(id);
  };

  updateUserPassword = async (
    id: IUser["_id"],
    password: IUser["password"]
  ) => {
    const isUserExist = await this.isUserIdExist(id);

    if (!isUserExist) {
      throw new Error("User not found");
    }

    return this.userRepository.updateUserPassword(id, password);
  };

  loginUser = async (params: Pick<IUser, "email" | "password">) => {
    const user = await this.getUserByEmail(params.email);

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

  verifyUser = async (verificationToken: string) => {
    const user = verifyVerificationToken(verificationToken);

    if (!user._id) {
      throw new Error("Invalid verification token");
    }

    const verifiedUser = await this.getUserById(user._id);

    if (!verifiedUser) {
      throw new Error("User not found");
    }

    if (verifiedUser?.verifiedAt) {
      throw new Error("User is already verified");
    }

    console.log(user);

    return this.userRepository.verifyUser(user._id);
  };
}
