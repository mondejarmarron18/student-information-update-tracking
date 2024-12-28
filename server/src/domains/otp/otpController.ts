import { Request, Response } from "express";
import OtpService from "./otpService";
import { x8tAsync } from "x8t";

export default class OtpController {
  private otpService: OtpService;

  constructor() {
    this.otpService = new OtpService();
  }

  generateOtp = async (req: Request, res: Response) => {
    const { email } = req.body;

    const { result, error } = await x8tAsync(
      this.otpService.generateOtp(email)
    );

    if (error !== null || result === null) {
      console.error("Error sending email:", error);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(201).send({ otp: result.otp });
  };

  verifyOtp = (req: Request, res: Response) => {
    const { otp } = req.body;

    const verified = this.otpService.verifyOtp(otp, 123);

    res.status(201).send({ verified });
  };

  getOtps = async (req: Request, res: Response) => {
    const { result, error } = await x8tAsync(this.otpService.getOtps());

    if (error !== null) {
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    res.status(200).send(result);
  };
}
