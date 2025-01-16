import { x8tAsync } from "x8t";
import { IVerificationCode } from "../verificationCodeModel";
import VerificationCodeRepository from "../verificationCodeRepository";
import CustomError from "../../../utils/CustomError";

export default class VerificationCodeService {
  verificationCodeRepository: VerificationCodeRepository;

  constructor() {
    this.verificationCodeRepository = new VerificationCodeRepository();
  }

  generateVerificationCode = (userId: IVerificationCode["userId"]) => {
    return this.verificationCodeRepository.createVerificationCode(userId);
  };

  getValidVerificationCode = async (id: IVerificationCode["_id"]) => {
    const verificationCode = await x8tAsync(
      this.verificationCodeRepository.getVerificationCode(id)
    );

    if (verificationCode.error || !verificationCode.result) {
      return CustomError.internalServerError({
        details: verificationCode.error || "Verification code not found",
      });
    }

    // Check if verification code is valid
    if (verificationCode.result.invalidatedAt) {
      return CustomError.badRequest({
        description: "Verification code is invalid",
      });
    }

    // Check if verification code is expired
    if (verificationCode.result.expiresAt < new Date()) {
      return CustomError.badRequest({
        description: "Verification code is expired",
      });
    }

    return verificationCode.result;
  };

  getVerificationCodeById = async (id: IVerificationCode["_id"]) => {
    const { error, result } = await x8tAsync(
      this.verificationCodeRepository.getVerificationCode(id)
    );

    if (error) {
      return CustomError.internalServerError({ details: error });
    }

    if (!result) {
      return CustomError.notFound({ details: "Verification code not found" });
    }

    return result;
  };

  invalidateVerificationCode = async (id: IVerificationCode["_id"]) => {
    const { error, result } = await x8tAsync(
      this.verificationCodeRepository.invalidateVerificationCode(id)
    );

    if (error) {
      return CustomError.internalServerError({ details: error });
    }

    if (!result) {
      return CustomError.notFound({ details: "Verification code not found" });
    }

    return result;
  };
}
