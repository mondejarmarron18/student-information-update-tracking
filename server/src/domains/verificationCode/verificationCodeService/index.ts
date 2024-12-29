import { x8tAsync } from "x8t";
import { IVerificationCode } from "../verificationCodeModel";
import VerificationCodeRepository from "../verificationCodeRepository";

export default class VerificationCodeService {
  verificationCodeRepository: VerificationCodeRepository;

  constructor() {
    this.verificationCodeRepository = new VerificationCodeRepository();
  }

  generateVerificationCode = (userId: IVerificationCode["userId"]) => {
    return this.verificationCodeRepository.createVerificationCode(userId);
  };

  getValidVerificationCode = async (
    id: IVerificationCode["_id"]
  ): Promise<IVerificationCode> => {
    const verificationCode = await x8tAsync(
      this.verificationCodeRepository.getVerificationCode(id)
    );

    if (verificationCode.error) throw verificationCode.error;

    if (!verificationCode.result) {
      throw new Error("Verification code not found");
    }

    // Check if verification code is valid
    if (verificationCode.result.invalidatedAt) {
      throw new Error("Verification code is invalid");
    }

    // Check if verification code is expired
    if (verificationCode.result.expiresAt < new Date()) {
      throw new Error("Verification code is expired");
    }

    return verificationCode.result;
  };
}
