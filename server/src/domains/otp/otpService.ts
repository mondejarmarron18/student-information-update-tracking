import { generateOtp } from "../../utils/otp";
import { IOtp } from "./otpModel";
import OtpRepository from "./otpRepository";

export default class OtpService {
  private otpRepository: OtpRepository;

  constructor() {
    this.otpRepository = new OtpRepository();
  }

  generateOtp = async (email: IOtp["email"]): Promise<IOtp> => {
    const otp = generateOtp();
    return this.otpRepository.createOtp({ otp, email });
  };

  verifyOtp = (otp: number, generatedOtp: number): boolean => {
    return otp === generatedOtp;
  };

  getOtps = () => {
    return this.otpRepository.getOtps();
  };
}
