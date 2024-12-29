import verificationCodeModel, {
  IVerificationCode,
} from "../verificationCodeModel";

export default class VerificationCodeRepository {
  verificationCodeModel: typeof verificationCodeModel;

  constructor() {
    this.verificationCodeModel = verificationCodeModel;
  }

  createVerificationCode = (userId: IVerificationCode["userId"]) => {
    return this.verificationCodeModel.create({
      userId,
    });
  };

  getVerificationCode = (id: IVerificationCode["_id"]) => {
    return this.verificationCodeModel.findById(id);
  };
}
