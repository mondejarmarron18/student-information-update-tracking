import otpModel, { IOtp } from "./otpModel";

export default class OtpRepository {
  private otpRespository: typeof otpModel;

  constructor() {
    this.otpRespository = otpModel;
  }

  createOtp = (params: Pick<IOtp, "email" | "otp">) => {
    return this.otpRespository.create(params);
  };

  getOtp = (otp: number) => {
    return this.otpRespository.findOne({ otp: otp, verifiedAt: null });
  };

  getOtpById = (id: IOtp["_id"]) => {
    return this.otpRespository.findById(id);
  };

  getOtpByEmail = (email: IOtp["email"]) => {
    return this.otpRespository
      .findOne({ email: email, verifiedAt: null })
      .sort({
        createdAt: -1,
      });
  };

  getOtps = () => {
    return this.otpRespository.find();
  };
}
